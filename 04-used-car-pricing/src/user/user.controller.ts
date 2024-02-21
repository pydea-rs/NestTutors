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
  // UseInterceptors,
  ClassSerializerInterceptor,
  ForbiddenException,
  Session,
  ConflictException,
  UnauthorizedException,
  Res,
  HttpStatus,
  Request,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { PostUserDto } from 'src/dtos/post-user.dto';
import { User } from './user.entity';
import { PatchUserDto } from 'src/dtos/patch-user.dto';
import { UserDto } from 'src/dtos/user.dto';
import { JustNameUserDto } from 'src/dtos/just-name-user.dto';
import { AuthService } from './auth.service';
import { EntityExistsException } from 'src/exceptions/entity-exists.exception';
import { Response } from 'express';
import { LoginUserDto } from 'src/dtos/login-user.dto';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
// @UseInterceptors(new UserSerializerInterceptor(UserDto))
@NoCredentialsUserSerialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  async register(@Body() body: PostUserDto, @Session() session: any) {
    if (session.userID) throw new ConflictException('You are logged in.');
    const { username, password, email } = body;
    try {
      const user = await this.authService.register(username, email, password);
      session.userID = user.id;
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
    @Session() session: any,
  ) {
    if (session?.userID) throw new ConflictException('You are logged in.');
    let user: User;
    try {
      user = await this.authService.login(
        username?.length ? username : email,
        password,
      );
    } catch (ex) {
      if (ex instanceof EntityNotFoundException)
        if (username?.length)
          throw new NotFoundException(
            `No user with this username:${username} found.`,
          );
        else
          throw new NotFoundException(
            `No user with this email:${email} found.`,
          );
    }
    if (!user)
      throw new ForbiddenException(
        'Cannot login because of wrong credentials.',
      );
    session.userID = user.id;
    return user;
  }

  @Post('/login')
  async loginByPost(
    @Body() body: LoginUserDto,
    @Session() session: any,
    @Res() response: Response
  ) {
    if (session.userID) throw new ConflictException('You are logged in.');
    let user: User;
    const {username, email, password} = body;
    try {
      user = await this.authService.login(
        username?.length ? username : email,
        password,
      );
    } catch (ex) {
      if (ex instanceof EntityNotFoundException)
        if (username?.length)
          throw new NotFoundException(
            `No user with this username:${username} found.`,
          );
        else
          throw new NotFoundException(
            `No user with this email:${email} found.`,
          );
    }
    if (!user)
      throw new ForbiddenException(
        'Cannot login because of wrong credentials.',
      );
    session.userID = user.id;
    delete user.password; // No credential interceptor doesnt work here.
    response.status(HttpStatus.OK)
        .send("Successful.\n" + JSON.stringify(user));
  }

  // by Request decorator and direct use of CurrentUserInterceptor
  // @Get('/whoami')
  // async whoami(@Request() request: any, @Session() session: any) {
  //   if (!session.userID)
  //     throw new UnauthorizedException(
  //       'You are not logged in to find out who you are!',
  //     );
  //   return request.currentUser;
  // }
  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(UserSerializerInterceptor)

  @Get('/whoami')
  @UseGuards(AuthGuard)
  async whoami(@CurrentUser() user: User) {
    return user;
  }

  @Post('/logout')
  async logout(@Session() session: any, @Res() response: Response) {
    session.userID = null;
    // return "Successfully logged out.";
    response.status(HttpStatus.OK)
      .send("Successfully logged out.");
  }
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
  @UseGuards(AuthGuard)
  async updateUser(@CurrentUser() user: User, @Param('id') id: string, @Body() body: PatchUserDto) {
    if(+id !== user.id)
      throw new UnauthorizedException('You are not allowed to modify other users\'s data!');
    try {
      user = await this.userService.update(user, body); // actually its not necessary to assign return value to user, but whatever!
      //   delete user.password; // removing delete password section, cause of using Exclude and CLassSerializerInterceptor
      return user;
    } catch (err) {
      // unused, for using userService.updateById
      if (err instanceof EntityNotFoundException)
        throw new NotFoundException('No user with this id found to update!');
    }
    return null;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @NoCredentialsUserSerialize(JustNameUserDto)
  @Delete('/:id')
  async deleteUser(@CurrentUser() user: User, @Param('id') id: string) {
    if(+id !== user.id)
      throw new UnauthorizedException('You are not allowed to remove other users\'s!');
    try {
      await this.userService.remove(user);
      //   delete user.password; // removing delete password section, cause of using Exclude and CLassSerializerInterceptor
      return "Successfully Removed.";
    } catch (err) {
      // unused, for using userService.removeById
      if (err instanceof EntityNotFoundException)
        throw new NotFoundException('No user with this id found to remove!');
    }
    return null;
  }
}
