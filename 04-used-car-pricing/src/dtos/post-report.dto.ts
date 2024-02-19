import { IsNumber, IsRgbColor, IsString } from "class-validator";


export class PostReportDto {
    @IsNumber()
    price: number;

    @IsString()
    model: string;

    @IsString()  //@IsRgbColor() // ???
    color: string;
}