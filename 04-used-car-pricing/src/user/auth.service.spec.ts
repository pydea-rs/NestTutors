import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

it('can create a instance of AuthService', async () => {
  const fakeUserService = {
    find: () => Promise.resolve([]),
    create: (username: string, email: string, password: string) =>
      Promise.resolve({ id: 1, username, email, password }),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UserService,
        useValue: fakeUserService,
      },
    ],
  }).compile();

  const service = module.get(AuthService);
  expect(service).toBeDefined();
});
