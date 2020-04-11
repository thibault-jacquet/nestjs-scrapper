import { Controller, Get, HttpCode, Logger, LoggerService, Query } from '@nestjs/common';

import { ScrapperService } from './scrapper.service';
import { ScrapParams } from './validation/srap.params';

@Controller('scrap')
export class ScrapperController {
  private readonly logger: LoggerService;
  constructor(private readonly scrapperService: ScrapperService) {
    this.logger = new Logger(ScrapperController.name);
  }

  @Get()
  @HttpCode(200)
  scrap(@Query() params: ScrapParams): Promise<any> {
    const { url, code } = params;
    this.logger.log(`Scraping... ${code} -  ${url}`);
    return this.scrapperService.scrap(code, url);
  }
}
