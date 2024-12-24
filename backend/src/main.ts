import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Optional: if using validation
  app.enableCors({
    origin: 'http://localhost:3000', // or the URL of your Next.js frontend
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();