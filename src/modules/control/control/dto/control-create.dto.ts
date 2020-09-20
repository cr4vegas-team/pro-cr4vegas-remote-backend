import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNumber } from "class-validator";


export class ControlCreateDto {

    @ApiProperty()
    @IsNumber()
    user: number;

}