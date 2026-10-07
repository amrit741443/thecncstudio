# CNC Studio Backend Completion Task

You are working on an existing **CNC Studio Education Management Backend**.

## Project Context

This is a **modular monolith**, not a microservices architecture.

Tech stack:

- NestJS
- TypeScript
- PostgreSQL
- Drizzle ORM
- postgres.js
- Better Auth
- pnpm
- class-validator / class-transformer

The project already has the overall folder structure and infrastructure.

The developer has already completed the **Education module up to Class**.

Do NOT recreate, rewrite, or unnecessarily refactor the existing Education implementation.

First inspect the existing repository and understand the current implementation before making changes.

---

# Current Architecture

The application follows:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Drizzle ORM
    ↓
PostgreSQL
```

Responsibilities:

### Controller

Responsible for:

- HTTP routes
- request parameters
- DTOs
- HTTP-level concerns

Do not put business logic here.

### Service

Responsible for:

- business rules
- validation involving database state
- orchestration
- transactions when required

### Repository

Responsible for:

- database queries
- Drizzle ORM
- PostgreSQL interaction

Do not put business rules inside repositories.

---

# Important TypeScript Rule

The project uses:

```json
"module": "NodeNext",
"moduleResolution": "NodeNext"
```

Therefore use `.js` extensions for relative imports:

```ts
import { DatabaseService } from "../../database/database.service.js"
```

Do NOT use:

```ts
import { DatabaseService } from "../../database/database.service"
```

or:

```ts
import { DatabaseService } from "../../database/database.service.ts"
```

Follow this consistently throughout the project.

---

# Existing Education Module

The Education module has already been implemented.

The conceptual hierarchy is:

```text
ProgramCategory
       ↓
Program
       ↓
Course
       ↓
Class
```

The existing database tables are:

```text
program_category
program
course
class
```

Do not recreate these tables.

Do not change their design unless there is a genuine compatibility or correctness problem discovered during implementation.

Inspect the existing schema and code before using it.

The Education module already contains the CRUD implementation through Class.

---

# Goal

Complete the remaining backend so that CNC Studio has a realistic, scalable V1 backend.

The remaining domains are:

```text
People
Enrollment
Scheduling
Attendance
Marketing
Authentication / Authorization integration
```

Also complete:

- relationships
- database migrations
- validation
- business rules
- error handling
- tests
- integration between modules
- API consistency
- production-quality cleanup

---

# 1. PEOPLE MODULE

Create the People domain.

Structure:

```text
src/people/
├── people.module.ts
├── students/
├── teachers/
└── guardians/
```

## Student

Create:

```text
student
```

Students are CNC Studio domain entities.

A student does NOT need a Better Auth account in V1.

Suggested information:

- id
- first_name
- last_name
- date_of_birth
- gender if appropriate to the existing product requirements
- phone if required
- email if required
- address if required
- emergency contact information if required
- is_active
- created_at
- updated_at

Do not over-model unnecessary fields.

Use the existing project's naming conventions.

Student should remain independent from Better Auth.

---

## Teacher Profile

Create:

```text
teacher_profile
```

A teacher profile belongs to a Better Auth `user`.

Relationship:

```text
user
  │
  └── teacher_profile
```

Use the existing Better Auth `user.id`.

Do NOT duplicate the authentication user table.

Teacher profile should contain only CNC-specific teacher information.

---

## Guardian Profile

Create:

```text
guardian_profile
```

Relationship:

```text
user
  │
  └── guardian_profile
```

Again, do not duplicate Better Auth users.

---

## Student Guardian

Create:

```text
student_guardian
```

This represents the relationship between students and guardians.

Relationship:

```text
student ←→ guardian_profile
```

A guardian may have multiple students.

A student may have multiple guardians.

Therefore this is a many-to-many relationship.

Include appropriate relationship metadata if useful, such as:

- relationship
- is_primary
- created_at

Avoid unnecessary complexity.

---

# 2. ENROLLMENT MODULE

Create:

```text
src/enrollment/
├── enrollment.module.ts
├── enrollment.controller.ts
├── enrollment.service.ts
├── enrollment.repository.ts
└── dto/
```

Database table:

```text
enrollment
```

Relationship:

```text
student
   │
   ▼
enrollment
   │
   ▼
class
```

An enrollment represents a student's registration in a specific class.

Important fields:

- id
- student_id
- class_id
- status
- enrolled_at
- created_at
- updated_at

Possible statuses:

```text
active
completed
cancelled
```

Business rules:

1. Student must exist.
2. Class must exist.
3. Class must be eligible for enrollment.
4. Student should not have duplicate active enrollment in the same class.
5. If class has capacity, do not allow enrollment beyond capacity.
6. Cancelled enrollment should not count toward capacity.
7. Enrollment operations should be safe against duplicate requests.

Use a database unique constraint where appropriate, not only application-level checks.

---

# 3. SCHEDULING MODULE

Create:

```text
src/scheduling/
├── scheduling.module.ts
├── locations/
├── rooms/
├── schedules/
└── sessions/
```

The scheduling hierarchy is:

```text
Location
   ↓
Room

Class
   ↓
ClassSchedule
   ↓
ClassSession
```

---

# Location

Create:

```text
location
```

Example:

```text
CNC Studio Kathmandu
```

Fields should include appropriate information such as:

- id
- name
- address
- is_active
- timestamps

---

# Room

Create:

```text
room
```

Relationship:

```text
location
   ↓
room
```

Possible fields:

- id
- location_id
- name
- capacity
- is_active
- timestamps

A room belongs to a location.

---

# Class Schedule

Create:

```text
class_schedule
```

This represents a recurring schedule.

Example:

```text
Every Monday
4:00 PM - 5:00 PM
Room A
```

Important distinction:

`class_schedule` is NOT an actual class occurrence.

It is the recurring rule.

Relationship:

```text
class
   ↓
class_schedule
   ↓
room
```

Suggested fields:

- id
- class_id
- room_id
- day_of_week
- start_time
- end_time
- start_date
- end_date
- is_active
- timestamps

Validate:

- end time must be after start time
- start date must not be after end date
- referenced class must exist
- referenced room must exist

Prevent obvious scheduling conflicts where practical.

---

# Class Session

Create:

```text
class_session
```

This represents an actual occurrence of a class.

For example:

```text
Schedule:
Every Monday 4 PM

Sessions:

October 5
October 12
October 19
October 26
```

Relationship:

```text
class_schedule
       ↓
class_session
```

Suggested fields:

- id
- class_id
- schedule_id if appropriate
- room_id if required by the chosen design
- session_date
- scheduled_start_time
- scheduled_end_time
- actual_start_time
- actual_end_time
- status
- notes
- created_at
- updated_at

Possible status:

```text
scheduled
completed
cancelled
rescheduled
```

Business rules:

- A session must belong to a valid class.
- Session date must be valid for the class/schedule.
- Prevent accidental duplicate sessions for the same class/date/time.
- A cancelled session should not be treated as an attended session.
- Support actual start/end times separately from scheduled times.

Do not over-engineer recurring schedule generation unless it is genuinely needed.

---

# 4. ATTENDANCE MODULE

Create:

```text
src/attendance/
├── attendance.module.ts
├── attendance.controller.ts
├── attendance.service.ts
├── attendance.repository.ts
└── dto/
```

Database table:

```text
attendance
```

Relationship:

```text
student
    │
    ▼
attendance
    ▲
    │
class_session
```

An attendance record answers:

> Was this student present for this specific class session?

Important fields:

- id
- student_id
- class_session_id
- status
- marked_at
- notes
- timestamps

Possible status:

```text
present
absent
late
excused
```

Business rules:

1. Student must exist.
2. Class session must exist.
3. Student should be enrolled in the corresponding class.
4. Do not allow duplicate attendance for the same student and session.
5. Attendance cannot be created for invalid/cancelled sessions unless explicitly supported.
6. Use a database unique constraint on:

```text
(student_id, class_session_id)
```

The service should handle attendance marking and updates.

---

# 5. MARKETING MODULE

Create:

```text
src/marketing/
├── marketing.module.ts
├── leads/
└── trial-bookings/
```

---

# Lead

Create:

```text
lead
```

A lead represents someone interested in CNC Studio before becoming a student.

Example:

```text
Website visitor
      ↓
Lead
      ↓
Trial
      ↓
Student
```

Suggested fields:

- id
- name
- phone
- email
- source
- interested_program_id if appropriate
- status
- notes
- created_at
- updated_at

Possible statuses:

```text
new
contacted
qualified
converted
lost
```

Do not make the marketing system overly complex.

---

# Trial Booking

Create:

```text
trial_booking
```

This represents a scheduled trial.

Relationship may connect:

```text
lead
   ↓
trial_booking
   ↓
class / course / program
```

Use the existing Education entities where appropriate rather than duplicating them.

Suggested information:

- id
- lead_id
- class_id or appropriate education reference
- scheduled_at
- status
- notes
- created_at
- updated_at

Possible status:

```text
scheduled
completed
cancelled
no_show
```

---

# 6. AUTHENTICATION AND AUTHORIZATION

Better Auth already owns:

```text
user
session
account
verification
```

Do not recreate authentication.

Integrate the application with Better Auth.

Use Better Auth `user.id` for:

```text
teacher_profile.user_id
guardian_profile.user_id
```

Authorization should distinguish roles such as:

```text
admin
teacher
guardian
```

Do not rely only on a role for every authorization decision.

Examples:

### Admin

Can manage:

- programs
- courses
- classes
- teachers
- students
- enrollments
- schedules
- attendance
- marketing

### Teacher

Should have appropriate access to:

- assigned classes
- class sessions
- attendance

### Guardian

Should have access only to appropriate information for their associated students.

Do not expose another guardian's students.

Authorization must be enforced at the service/business layer, not only by hiding frontend buttons.

---

# 7. DATABASE RELATIONSHIP OVERVIEW

The final conceptual model should look approximately like this:

```text
                    user
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
 teacher_profile        guardian_profile
                               │
                               │
                               ▼
                       student_guardian
                               │
                               ▼
                            student
                               │
                               ▼
                          enrollment
                               │
                               ▼
                              class
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
        class_schedule                  class_session
                │                             │
                ▼                             ▼
               room                      attendance
                │                             ▲
                ▼                             │
             location                     student


program_category
        │
        ▼
     program
        │
        ▼
      course
        │
        ▼
      class


lead
  │
  ▼
trial_booking
  │
  ▼
class / course / program
```

---

# 8. Database Design Rules

Follow these rules throughout the implementation.

## IDs

Use UUID for CNC domain entities unless there is a strong reason otherwise.

Better Auth IDs remain TEXT because Better Auth owns them.

## PostgreSQL naming

Use snake_case:

```text
student_id
created_at
updated_at
date_of_birth
class_session_id
```

## TypeScript naming

Use camelCase:

```ts
studentId
createdAt
updatedAt
dateOfBirth
classSessionId
```

Drizzle maps between them.

## Foreign keys

Add appropriate foreign keys.

Use sensible delete behavior.

Do not casually use:

```text
ON DELETE CASCADE
```

for important business records.

For example, deleting a student should not silently destroy historical attendance and enrollment records.

Prefer restrictive behavior or soft deletion where appropriate.

## Indexes

Add indexes to foreign-key columns and frequently queried fields.

Do not add indexes blindly.

## Unique constraints

Use database constraints for rules such as:

```text
student + class active enrollment
student + class_session attendance
unique class code
unique program slug
```

Application validation alone is not enough for data integrity.

---

# 9. Timestamps

Use:

```text
created_at
updated_at
```

with PostgreSQL `timestamptz`.

Remember:

`defaultNow()` only sets the initial value.

It does not automatically update `updated_at` on every UPDATE.

Implement update handling consistently in the application unless the existing architecture intentionally uses a PostgreSQL trigger.

---

# 10. DTO Validation

Every create/update endpoint must use DTOs.

Use:

```text
class-validator
class-transformer
```

Examples:

```ts
@IsString()
@Length(1, 150)
name!: string
```

```ts
@IsUUID()
studentId!: string
```

```ts
@IsInt()
@Min(1)
capacity!: number
```

Do not trust incoming HTTP data.

---

# 11. Error Handling

Use appropriate NestJS exceptions.

Examples:

```text
NotFoundException
ConflictException
BadRequestException
ForbiddenException
UnauthorizedException
```

Examples:

If student doesn't exist:

```text
404 Not Found
```

If duplicate enrollment:

```text
409 Conflict
```

If teacher attempts an unauthorized operation:

```text
403 Forbidden
```

Do not return raw database errors to clients.

Translate known database constraint errors into meaningful API errors.

---

# 12. Transactions

Use database transactions when multiple changes must succeed or fail together.

Examples:

Enrollment operations that update multiple related records.

Attendance operations if multiple attendance records are marked together.

Trial conversion if the implementation eventually creates multiple related records.

Do not put transactions everywhere.

Use them where atomicity actually matters.

---

# 13. Repository Design

Keep repositories focused.

Example:

```ts
class StudentsRepository {
  findById()
  findAll()
  create()
  update()
  delete()
}
```

Do not create a giant:

```text
DatabaseRepository
```

containing every table.

Each domain owns its queries.

---

# 14. Service Design

Services contain business logic.

Example:

```text
EnrollmentService
```

should perform:

```text
student exists?
        ↓
class exists?
        ↓
class accepts enrollment?
        ↓
capacity available?
        ↓
already enrolled?
        ↓
create enrollment
```

The repository should only know how to execute the database operations.

---

# 15. API Design

Use:

```text
/api/v1
```

Keep REST endpoints consistent.

Examples:

```text
GET    /api/v1/students
POST   /api/v1/students
GET    /api/v1/students/:id
PATCH  /api/v1/students/:id
DELETE /api/v1/students/:id
```

Enrollment:

```text
POST   /api/v1/enrollments
GET    /api/v1/enrollments
GET    /api/v1/enrollments/:id
PATCH  /api/v1/enrollments/:id
```

Scheduling:

```text
GET    /api/v1/locations
POST   /api/v1/locations

GET    /api/v1/rooms
POST   /api/v1/rooms

GET    /api/v1/class-schedules
POST   /api/v1/class-schedules

GET    /api/v1/class-sessions
POST   /api/v1/class-sessions
```

Attendance:

```text
GET    /api/v1/attendance
POST   /api/v1/attendance
PATCH  /api/v1/attendance/:id
```

Marketing:

```text
GET    /api/v1/leads
POST   /api/v1/leads
PATCH  /api/v1/leads/:id

GET    /api/v1/trial-bookings
POST   /api/v1/trial-bookings
PATCH  /api/v1/trial-bookings/:id
```

Follow the existing Education API style instead of introducing a different convention.

---

# 16. Testing Requirements

Do not consider the backend complete just because it compiles.

Add tests for important business rules.

At minimum test:

## People

- create student
- get student
- update student
- guardian/student relationship

## Enrollment

- successful enrollment
- student doesn't exist
- class doesn't exist
- duplicate enrollment
- class capacity reached

## Scheduling

- create location
- create room
- invalid room/location relationship
- create schedule
- invalid time range
- create session
- duplicate session

## Attendance

- mark present
- mark absent
- duplicate attendance
- student not enrolled
- invalid session

## Marketing

- create lead
- update lead
- create trial booking
- invalid lead
- invalid class/course relationship

## Authorization

Test that:

```text
admin → allowed
teacher → only appropriate operations
guardian → only associated students
```

Do not write tests only for successful paths.

Test failure paths too.

---

# 17. Migration Workflow

Use migrations as the source of truth.

After schema changes:

```bash
pnpm drizzle-kit generate
```

Inspect the generated SQL.

Then:

```bash
pnpm drizzle-kit migrate
```

Do not blindly use `drizzle-kit push` as the main workflow.

Never manually modify production database structure without updating the migration history.

---

# 18. What NOT to do

Do not:

- recreate Better Auth tables
- create a duplicate users table
- create a `persons` table
- create a separate student authentication system
- turn this into microservices
- introduce CQRS/event sourcing
- introduce Kafka/RabbitMQ
- introduce Redis unless there is an actual requirement
- create a generic repository abstraction
- create unnecessary base classes
- create unnecessary interfaces for every class
- over-engineer permissions
- add fields just because they might be useful someday
- rewrite the Education module without a concrete reason
- duplicate business logic between controllers and services

This is a **production-minded V1**, not an enterprise architecture exercise.

---

# 19. Implementation Order

Implement in this order:

```text
1. People
   ├── Students
   ├── Teachers
   ├── Guardians
   └── Student-Guardian

2. Enrollment

3. Scheduling
   ├── Locations
   ├── Rooms
   ├── Class Schedules
   └── Class Sessions

4. Attendance

5. Marketing
   ├── Leads
   └── Trial Bookings

6. Better Auth integration
   └── Authorization

7. Cross-module integration

8. Tests

9. Database migrations

10. Final validation
```

This order is intentional because the dependencies flow approximately like:

```text
People
  ↓
Education
  ↓
Enrollment
  ↓
Scheduling
  ↓
Attendance
```

while Marketing can interact with Education/People.

---

# 20. Agent Workflow

Before modifying anything:

1. Inspect the repository.
2. Inspect `package.json`.
3. Inspect `drizzle.config.ts`.
4. Inspect the existing database schema.
5. Inspect the existing Education implementation.
6. Inspect Better Auth configuration.
7. Inspect existing NestJS modules.
8. Determine what is already implemented.
9. Do not recreate existing work.

Then implement one domain at a time.

After each domain:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

If the project does not have a `typecheck` script, use the appropriate TypeScript compiler command.

Generate migrations after schema changes:

```bash
pnpm drizzle-kit generate
```

Inspect the migration before applying it:

```bash
pnpm drizzle-kit migrate
```

Fix errors before moving to the next domain.

---

# 21. Final Definition of Done

The backend is complete when:

- [ ] People module works
- [ ] Students work
- [ ] Teacher profiles work
- [ ] Guardian profiles work
- [ ] Student-guardian relationships work
- [ ] Enrollment works
- [ ] Capacity rules work
- [ ] Duplicate enrollment is prevented
- [ ] Locations work
- [ ] Rooms work
- [ ] Class schedules work
- [ ] Class sessions work
- [ ] Attendance works
- [ ] Duplicate attendance is prevented
- [ ] Enrollment is checked before attendance
- [ ] Leads work
- [ ] Trial bookings work
- [ ] Better Auth is integrated
- [ ] Authorization is enforced
- [ ] DTO validation works
- [ ] Proper HTTP exceptions are returned
- [ ] Foreign keys exist
- [ ] Important indexes exist
- [ ] Important unique constraints exist
- [ ] Migrations are generated
- [ ] Migrations apply successfully
- [ ] Unit/service tests exist
- [ ] Integration tests exist for important flows
- [ ] TypeScript compiles
- [ ] Lint passes
- [ ] Tests pass
- [ ] No unnecessary architectural complexity was introduced

## Most Important Instruction

**Do not blindly generate everything at once.**

Work incrementally.

After each domain, inspect the existing implementation, make the necessary files, run the checks, and fix errors before continuing.

Preserve the existing coding style and architecture.

The final result should feel like **one coherent CNC Studio backend**, not a collection of generated CRUD modules.
