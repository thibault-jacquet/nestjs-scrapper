import { Module } from '@nestjs/common';

import { ConvertModule } from './convert/convert.module';
import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [ScrapperModule, ConvertModule],
})
export class AppModule {}
