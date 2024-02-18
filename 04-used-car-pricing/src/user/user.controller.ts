import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post('/register')
    register(@Body() body: UserDto) {
        const {username, password, email} = body;
        return this.userService.create(username, password, email);
        // return this.userService.createDirectly(username, password, email);  // Just for tutorial purposes

    }
    
}
