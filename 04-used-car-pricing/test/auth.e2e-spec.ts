import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import initApp from '../src/init-app';

const randomIdentifier = (emailProvider?: string|null, length: number = 7) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz123456789.';
  return (
    Array(length)
      .fill(0)
      .map((_) => characters[(Math.random() * characters.length) | 0])
      .join('') + (emailProvider ?? "")
  );
};

describe('Authentication System test (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initApp(app);
    await app.init();
  });

  it('/user/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({email: randomIdentifier('@gmail.com'), username: randomIdentifier(), password: 'Attest7_3'})
      .expect(201)
      .then(res => {
            const {id, username, email} = res.body;
            expect(id).toBeDefined();
            expect(email).toContain('@gmail.com');
            expect(username).toBeDefined();
      })
  });
});
