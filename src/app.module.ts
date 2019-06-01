import { Module } from '@nestjs/common';

import { ScrapperModule } from './scrapper/scrapper.module';

@Module({
  imports: [ScrapperModule],
})
export class AppModule {}
