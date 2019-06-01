import { Controller, Get, HttpCode, Logger, LoggerService } from '@nestjs/common';

import { ScrapperService } from './scrapper.service';

@Controller('scrap')
export class ScrapperController {
  private readonly logger: LoggerService;
  constructor(private readonly scrapperService: ScrapperService) {
    this.logger = new Logger(ScrapperController.name);
  }

  @Get()
  @HttpCode(200)
  scrap(): Promise<any> {
    this.logger.log('Scrap');
    return this.scrapperService.scrap();
  }
}
