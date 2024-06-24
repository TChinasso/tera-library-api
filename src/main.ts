import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createServer } from 'http';
const express = require('express')
async function bootstrap() {
  const expressApp = await express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.listen(3001)
  app.enableCors()
  return createServer(expressApp);
}
export const maxDuration = 600
const app = bootstrap();
export default app