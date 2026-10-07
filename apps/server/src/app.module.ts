import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { createAuth } from '@repo/auth/server';
import type { Database } from '@repo/db';

<<<<<<< Updated upstream
import { AppController } from '@/app.controller.js';
import { AppService } from '@/app.service.js';
=======
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AttendanceModule } from '@/attendance/attendance.module.js';
>>>>>>> Stashed changes
import { DatabaseModule, DRIZZLE } from '@/database/database.module.js';
import { EducationModule } from '@/education/education.module.js';
import { EnrollmentModule } from '@/enrollment/enrollment.module.js';
import { MarketingModule } from '@/marketing/marketing.module.js';
import { PeopleModule } from '@/people/people.module.js';
import { SchedulingModule } from '@/scheduling/scheduling.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule.forRootAsync({
      inject: [DRIZZLE, ConfigService],
      useFactory: (db: Database, config: ConfigService) => ({
        auth: createAuth(db, {
          secret: config.getOrThrow('BETTER_AUTH_SECRET'),
          baseURL: config.getOrThrow('BETTER_AUTH_URL'),
          trustedOrigins: [config.getOrThrow('WEB_URL')],
        }),
      }),
    }),
    EducationModule,
    PeopleModule,
    EnrollmentModule,
    SchedulingModule,
    AttendanceModule,
    MarketingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
