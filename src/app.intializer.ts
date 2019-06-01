import { INestApplication, INestExpressApplication } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as swaggerStats from 'swagger-stats';

import { apiConfig } from './config/api.config';
import { securityConfig } from './config/security.config';

export class AppInitializer {
  private application: INestExpressApplication & INestApplication;
  constructor(app: INestExpressApplication & INestApplication) {
    this.application = app;
  }

  public configure(): void {
    this.application.setGlobalPrefix(apiConfig.basePath);
    this.application.use(bodyParser.json(securityConfig.payloadLimit)); // Maximum size of the request payload.
    this.application.use(cookieParser());
    this.application.use(helmet());
    // this.application.use(csurf(securityConfig.csrf));
    this.application.use(rateLimit(securityConfig.rateLimit));
    this.application.use(swaggerStats.getMiddleware());
  }
}
