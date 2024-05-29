import { INestApplication, ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

export default function initApp(app: INestApplication<any>) {
  app.use(
    cookieSession({
      keys: ['testwhatever'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove anything Other than defined DTO s when validating requests body
    }),
  );
}
