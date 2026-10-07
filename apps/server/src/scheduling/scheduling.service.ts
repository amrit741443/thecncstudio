import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { schema, type Database } from '@repo/db';
import { Inject } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module.js';
import { CreateLocationDto } from './dto/create-location.dto.js';

@Injectable()
export class SchedulingService {
  constructor(@Inject(DRIZZLE) private readonly db: Database) {}

  async createLocation(input: CreateLocationDto) {
    return this.db
      .insert(schema.location)
      .values({
        id: randomUUID(),
        name: input.name,
        address: input.address || null,
        phone: input.phone || null,
        isActive: input.isActive ?? true,
      })
      .returning();
  }

  async listLocations() {
    return this.db.select().from(schema.location).orderBy(schema.location.name);
  }
}
