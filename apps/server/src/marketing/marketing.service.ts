import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { schema, type Database } from '@repo/db';
import { Inject } from '@nestjs/common';
import { DRIZZLE } from '../database/database.module.js';
import { MarketingRepository } from './marketing.repository.js';
import { CreateLeadDto } from './dto/create-lead.dto.js';

@Injectable()
export class MarketingService {
  constructor(
    private readonly repository: MarketingRepository,
    @Inject(DRIZZLE) private readonly db: Database,
  ) {}

  async createLead(input: CreateLeadDto) {
    return this.repository.createLead({
      id: randomUUID(),
      name: input.name,
      email: input.email || null,
      phone: input.phone || null,
      source: input.source || null,
      status: 'new',
    });
  }

  async listLeads() {
    return this.repository.listLeads();
  }
}
