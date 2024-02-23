import { Expose } from "class-transformer";


export class JustNameUserDto {
    @Expose()
    username: string;

    @Expose()
    id: number;
}