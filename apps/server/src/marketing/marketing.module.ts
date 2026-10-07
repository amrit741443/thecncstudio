import { Module } from '@nestjs/common';

import { MarketingController } from './marketing.controller.js';
import { MarketingRepository } from './marketing.repository.js';
import { MarketingService } from './marketing.service.js';

@Module({
  controllers: [MarketingController],
  providers: [MarketingRepository, MarketingService],
})
export class MarketingModule {}
