import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    // Notice: Password must be hashed. This is just temp.
    create(username: string, email: string, password: string) {
        const user: User = this.userRepository.create({username, password, email}); // using create then save will let u do soem other stuff(like data validation) before saving.
        // But if its not needed directly using save is sufficient.
        return this.userRepository.save(user);
    }

    createDirectly(username: string, email: string, password: string) {
        return this.userRepository.save({username, password, email}); // This works too
    }
}
