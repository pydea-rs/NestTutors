import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { EntityExistsException } from '../exceptions/entity-exists.exception';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';

const ascrypt = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(username: string, email: string, password: string) {
    let [existingUser] = await this.userService.find({ username });
    if (existingUser)
      throw new EntityExistsException('User', 'username', username);
    [existingUser] = await this.userService.find({ email });
    if (existingUser) throw new EntityExistsException('User', 'email', email);
    const salt = randomBytes(8).toString('hex');
    const hashedPassword = await ascrypt(password, salt, 32);

    const user = await this.userService.create(
      username,
      email,
      `${salt}.${hashedPassword}`,
    );
    return user;
  }

  async login(identifier: string, password: string) {
    const [user] = await this.userService.find(
      identifier.includes('@')
        ? { email: identifier }
        : { username: identifier },
    );
    if (!user) throw new EntityNotFoundException('User');
    const [salt, hashedPassword] = user.password.split('.');
    const enteredPasswordHashed = await ascrypt(password, salt, 32);
    if (hashedPassword != enteredPasswordHashed) return null;
    return user;
  }
}
