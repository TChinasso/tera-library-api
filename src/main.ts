import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer } from 'http';
import * as express from 'express';
async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.listen(3001)
  await app.init();

  return createServer(expressApp);
}
export const maxDuration = 600
const app = bootstrap();
export default app