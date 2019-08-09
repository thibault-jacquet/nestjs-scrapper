import { Controller, Get, HttpCode, Logger, LoggerService, Query } from '@nestjs/common';

import { ScrapperService } from './scrapper.service';

@Controller('scrap')
export class ScrapperController {
  private readonly logger: LoggerService;
  constructor(private readonly scrapperService: ScrapperService) {
    this.logger = new Logger(ScrapperController.name);
  }

  @Get()
  @HttpCode(200)
  scrap(@Query() query: any): Promise<any> {
    this.logger.log(`Scraping... ${query.code} ${query.isin}`);
    return this.scrapperService.scrap(query.code, query.isin);
  }
}
