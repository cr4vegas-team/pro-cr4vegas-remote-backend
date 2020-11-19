import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class ActionCreateDto {

    @ApiProperty()
    @IsNumber()
    session: number;

    @ApiProperty()
    @IsNumber()
    unit: number;

}