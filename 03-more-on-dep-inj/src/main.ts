import { NestFactory } from '@nestjs/core';
import { HumanModule } from './human.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(HumanModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
}
bootstrap();
