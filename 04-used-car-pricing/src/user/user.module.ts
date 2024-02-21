import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, AuthService, {provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor}], // globally scoped interceptor
  // providers: [UserService, AuthService, CurrentUserInterceptor],// ControllerScope Interceptor
  controllers: [UserController]
})
export class UserModule {}
