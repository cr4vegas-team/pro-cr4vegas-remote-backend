import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class SessionCreateDto {

    @ApiProperty()
    @IsNumber()
    user: number;

}