import { IsString } from "class-validator"

export class GetSingleMessageDto {
    @IsString()
    id: string
}