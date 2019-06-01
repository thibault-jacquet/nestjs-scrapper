import { NestFactory } from '@nestjs/core';

import { AppInitializer } from './app.intializer';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appInitializer = new AppInitializer(app);
  appInitializer.configure();
  await app.listen(process.env.PORT);
}
bootstrap();
