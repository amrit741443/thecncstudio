import { Inject, Injectable } from '@nestjs/common';
import { schema, type Database } from '@repo/db';
import { DRIZZLE } from '../database/database.module.js';

@Injectable()
export class SchedulingRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async createLocation(input: typeof schema.location.$inferInsert) {
    return this.db.insert(schema.location).values(input).returning();
  }

  async listLocations() {
    return this.db.select().from(schema.location).orderBy(schema.location.name);
  }
}
