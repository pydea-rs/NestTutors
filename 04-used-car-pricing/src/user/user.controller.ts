import { UserSerializerInterceptor } from './../interceptors/user-serialize.interceptor';
import { EntityNotFoundException } from './../exceptions/entity-not-found.exception';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUserDto } from 'src/dtos/post-user.dto';
import { User } from './user.entity';
import { PatchUserDto } from 'src/dtos/patch-user.dto.';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  register(@Body() body: PostUserDto) {
    const { username, password, email } = body;
    return this.userService.create(username, email, password);
    // return this.userService.createDirectly(username, password, email);  // Just for tutorial purposes
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(UserSerializerInterceptor)
  @Get('/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.findOne(+id); // or parseInt
    if (!user)
      throw new NotFoundException('No uswer with this id has been found!');
    // delete user.password; // removing delete password section, cause of using Exclude and CLassSerializerInterceptor
    return user;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getSomeUsers(
    @Query('username') username: string,
    @Query('email') email: string,
  ) {
    let users: User[] = [],
      fieldname: string = '';
    if (username?.trim().length) {
      users = await this.userService.find({ username });
      fieldname = 'username';
    } else if (email?.trim().length) {
      users = await this.userService.find({ email });
      fieldname = 'email';
    }

    if (!users?.length)
      throw new NotFoundException(
        `No user has been found with such ${fieldname}!`,
      );
    // removing delete password section, cause of using Exclude and CLassSerializerInterceptor
    // return users.map((user: User) => {
    //   delete user.password;
    //   return user;
    // });
    return users;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: PatchUserDto) {
    try {
      const user = await this.userService.update(+id, body);
    //   delete user.password; // removing delete password section, cause of using Exclude and CLassSerializerInterceptor
      return user;
    } catch (err) {
      if (err instanceof EntityNotFoundException)
        throw new NotFoundException('No user with this id found to update!');
    }
    return null;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.userService.remove(+id);
    //   delete user.password; // removing delete password section, cause of using Exclude and CLassSerializerInterceptor 
      return user;
    } catch (err) {
      if (err instanceof EntityNotFoundException)
        throw new NotFoundException('No user with this id found to remove!');
    }
    return null;
  }
}
