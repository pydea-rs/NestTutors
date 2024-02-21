import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    password: string;
}