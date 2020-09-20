import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class ManageCreateDto {

    @ApiProperty()
    @IsNumber()
    control: number;

    @ApiProperty()
    @IsNumber()
    unit: number;

}