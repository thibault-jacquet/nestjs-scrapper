import { Controller, Get, HttpCode, Logger, LoggerService, Query } from '@nestjs/common';

import { ParseCurrencyPipe } from '../pipe/currency.pipe';
import { ConvertService } from './convert.service';

@Controller('convert')
export class ConvertController {
  private readonly logger: LoggerService;
  constructor(private readonly convertService: ConvertService) {
    this.logger = new Logger(ConvertController.name);
  }

  @Get()
  @HttpCode(200)
  scrap(@Query('amount', ParseCurrencyPipe) amount: string): Promise<any> {
    this.logger.log(`Convert ${amount} EUR to USD...`);
    return this.convertService.convert(amount);
  }
}
