import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDb, type Database } from '@repo/db';

export const DRIZZLE = Symbol('DRIZZLE_DB');

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Database => {
        const databaseUrl = configService.getOrThrow<string>('DATABASE_URL');
        return createDb(databaseUrl);
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async onModuleDestroy() {
    await this.db.$client.end();
  }
}
