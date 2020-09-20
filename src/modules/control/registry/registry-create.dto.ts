import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class RegistryCreateDto {

    @ApiProperty()
    @IsNumber()
    control: number;

    // ==================================================

    @ApiProperty()
    @IsString()
    message: string;

}