import { Inject, Injectable } from '@nestjs/common';
import { schema, type Database } from '@repo/db';
import { DRIZZLE } from '../database/database.module.js';

@Injectable()
export class MarketingRepository {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async createLead(input: typeof schema.lead.$inferInsert) {
    return this.db.insert(schema.lead).values(input).returning();
  }

  async listLeads() {
    return this.db.select().from(schema.lead).orderBy(schema.lead.createdAt);
  }
}
