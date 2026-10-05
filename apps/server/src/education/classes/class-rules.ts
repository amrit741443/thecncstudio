import { UnprocessableEntityException } from '@nestjs/common';

export const CLASS_STATUSES = [
  'planned',
  'active',
  'completed',
  'cancelled',
] as const;
export type ClassStatus = (typeof CLASS_STATUSES)[number];

/** planned -> active -> completed, and cancellation from planned/active. completed/cancelled are final. */
const ALLOWED_TRANSITIONS: Record<ClassStatus, readonly ClassStatus[]> = {
  planned: ['active', 'cancelled'],
  active: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

/** Dates are 'YYYY-MM-DD' strings, so plain string comparison is correct and avoids timezone bugs. */
export function assertDateRange(startDate: string, endDate: string | null) {
  if (!endDate) {
    throw new UnprocessableEntityException('endDate is required');
  }
  if (endDate < startDate)
    throw new UnprocessableEntityException(
      'endDate must be on or after startDate',
    );
}

export function assertStatusTransition(from: ClassStatus, to: ClassStatus) {
  if (from === to) return;
  if (!ALLOWED_TRANSITIONS[from].includes(to)) {
    throw new UnprocessableEntityException(
      `Cannot change class status from '${from}' to '${to}'`,
    );
  }
}

export function assertCapacityFitsEnrollment(
  capacity: number,
  activeEnrollments: number,
) {
  if (capacity < activeEnrollments) {
    throw new UnprocessableEntityException(
      `Capacity ${capacity} is below the ${activeEnrollments} students currently enrolled`,
    );
  }
}
