import { Controller, Get, HttpCode, Logger, LoggerService, Query } from '@nestjs/common';

@Controller('test')
export class TestController {
  private readonly logger: LoggerService;
  constructor() {
    this.logger = new Logger(TestController.name);
  }

  @Get('scrap')
  @HttpCode(200)
  scrap(@Query() params: any): Object {
    const { url, code } = params;
    this.logger.log(`Scraping... ${code} -  ${url}`);
    return {};
  }

  @Get('convert')
  @HttpCode(200)
  convert(@Query('amount') amount: string): Object {
    this.logger.log(`Convert ${amount} EUR to USD...`);
    return {};
  }
}
