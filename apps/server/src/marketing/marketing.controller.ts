import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto.js';
import { MarketingService } from './marketing.service.js';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly service: MarketingService) {}

  @Post('leads')
  createLead(@Body() input: CreateLeadDto) {
    return this.service.createLead(input);
  }

  @Get('leads')
  listLeads() {
    return this.service.listLeads();
  }
}
