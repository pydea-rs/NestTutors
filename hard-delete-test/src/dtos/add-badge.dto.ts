import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class AddBadgeDto {
    @IsString()
    name: string;
}