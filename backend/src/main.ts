import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser()); // Enable cookie-parser
  app.useGlobalPipes(new ValidationPipe()); // Optional: if using validation
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.enableCors({
    origin: 'http://localhost:5000', // or the URL of your Next.js frontend
    credentials: true,
  });
  await app.listen(5001);
}
bootstrap();