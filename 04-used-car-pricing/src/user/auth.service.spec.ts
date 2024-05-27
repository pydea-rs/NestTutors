import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from './user.entity';
import { scrypt } from 'crypto';
import { promisify } from 'util';

const ascrypt = promisify(scrypt);

describe('UnitTesting AuthService:', () => {
  let service: AuthService;
  let fakeUserService: Partial<UserService & { users: User[] }>;
  let users = [];
  beforeEach(async () => {
    fakeUserService = {
      find: ({ username, email }) => {
        const res = users.find(
          (item) => item.email === email || item.username === username,
        );
        // or use: users.filter(user => user.email == email)
        return Promise.resolve(res ? [res] : []);
      },
      create: (username: string, email: string, password: string) => {
        const user = {
          id: users.length + 1,
          username,
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
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

  it('if user can register a new account', async () => {
    const username = 'test',
      email = 'test@gmail.com',
      password = '12345';
    const user = await service.register(username, email, password);

    expect(user).toBeDefined();

    expect(user.password).not.toEqual(password);

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    const supposedPassword = await ascrypt(password, salt, 32);
    expect(hash).toEqual(supposedPassword.toString());
  });

  it('test if it prevents registering users with used username', (done) => {
    const [user] = users;
    // try {
    //   const {username, email, password} = user;
    //   await service.register(username, email + "X", password);
    // } catch(ex) {
    //   // console.log(ex);
    //   done();
    // } // works fine in tutorial but throws logical error in mine
    const { username, email, password } = user;
    service
      .register(username, email + 'X', password)
      .then(() => {})
      .catch(() => done());
  });

  it('test if it prevents registering users with used email', (done) => {
    const [user] = users;

    const { username, email, password } = user;

    service
      .register(username + 'X', email, password)
      .then(() => {})
      .catch(() => done());
  });

  it('throws if user signs in with username that not exists', (done) => {
    service
      .login('dkljadklajsl', 'adasfasfd')
      .then(() => {})
      .catch(() => done());
  });

  it('throws if user tyrs to sign in with a not existing email', (done) => {
    service
      .login('useraedfa@gmail.com', 'sdadas')
      .then(() => {})
      .catch(() => done());
  });

  it('throws if user signs in with an incorrect password', (done) => {
    const [user] = users;
    service
      .login(user.username, 'fdsfasdf')
      .then(() => {})
      .catch(() => done());
  });
});
