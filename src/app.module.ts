import { Module } from '@nestjs/common';

import { ConvertModule } from './modules/convert/convert.module';
import { ScrapperModule } from './modules/scrapper/scrapper.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [ScrapperModule, ConvertModule, TestModule],
})
export class AppModule {}
