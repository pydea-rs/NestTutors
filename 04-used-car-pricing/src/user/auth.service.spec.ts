import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UnitTesting AuthService:', () => {
  let service: AuthService;

  beforeEach(async () => {
    const fakeUserService: Partial<UserService> = {
      find: () => Promise.resolve([]),
      create: (username: string, email: string, password: string) =>
        Promise.resolve({ id: 1, username, email, password } as User),
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

    service = module.get(AuthService);
  });

  it('can create a instance of AuthService', async () => {
    expect(service).toBeDefined();
  });
});
