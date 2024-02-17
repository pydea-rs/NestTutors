import { IsPositive, IsNumber } from "class-validator";

export class MinutesDto {
    @IsNumber() @IsPositive()
    minutes: number;
}