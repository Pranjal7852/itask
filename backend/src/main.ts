import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { Express } from 'express';
// @ts-ignore
const morganBody = require('morgan-body') as (app: Express) => void;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // HTTP request logging
  app.use(morgan('dev'));
  morganBody(app.getHttpAdapter().getInstance() as Express);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Backend running on: http://localhost:${port}/api`);
}

void bootstrap();
