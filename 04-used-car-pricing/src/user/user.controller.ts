import {
  NoCredentialsUserSerialize,
  UserSerializerInterceptor,
} from './../interceptors/user-serialize.interceptor';
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
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUserDto } from 'src/dtos/post-user.dto';
import { User } from './user.entity';
import { PatchUserDto } from 'src/dtos/patch-user.dto.';
import { UserDto } from 'src/dtos/user.dto';
import { JustNameUserDto } from 'src/dtos/just-name-user.dto';
import { AuthService } from './auth.service';
import { EntityExistsException } from 'src/exceptions/entity-exists.exception';

@Controller('user')
// @UseInterceptors(new UserSerializerInterceptor(UserDto))
@NoCredentialsUserSerialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  async register(@Body() body: PostUserDto) {
    const { username, password, email } = body;
    try {
      const user = await this.authService.register(username, email, password);
      return user;
    } catch (ex) {
      if (ex instanceof EntityExistsException)
        throw new ForbiddenException(ex.message);
    }
    return 'What the fuck?';
    // return this.userService.createDirectly(username, password, email);  // Just for tutorial purposes
  }

  @Get('/login')
  async login(
    @Query('username') username: string,
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    let user: User;
    try {
      user = await this.authService.login(username?.length ? username: email, password);
      
    } catch(ex) {
      if(ex instanceof EntityNotFoundException)
        if(username?.length)
          throw new NotFoundException(`No user with this username:${username} found.`)
        else
          throw new NotFoundException(`No user with this email:${email} found.`)
    }
    if(!user)
      throw new ForbiddenException('Cannot login because of wrong credentials.')
    return user;
  }
  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(UserSerializerInterceptor)
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
  @NoCredentialsUserSerialize(JustNameUserDto)
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
