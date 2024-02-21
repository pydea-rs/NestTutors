import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['testwhatever']
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove anything Other than defined DTO s when validating requests body
  }));
  await app.listen(4000);
}
bootstrap();
