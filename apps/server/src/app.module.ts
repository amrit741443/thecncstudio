import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { createAuth } from '@repo/auth/server';
import type { Database } from '@repo/db';

import { AppController } from '@/app.controller.js';
import { AppService } from '@/app.service.js';
import { DatabaseModule, DRIZZLE } from '@/database/database.module.js';
import { EducationModule } from '@/education/education.module.js';

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
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
