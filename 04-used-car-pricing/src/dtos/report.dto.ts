import { IsNumber, IsRgbColor, IsString } from "class-validator";


export class ReportDto {
    @IsNumber()
    price: number;

    @IsString()
    model: string;

    @IsString()  //@IsRgbColor() // ???
    color: string;
}