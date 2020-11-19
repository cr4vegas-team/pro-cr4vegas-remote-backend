import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class OrderCreateDto {

    @ApiProperty()
    @IsNumber()
    session: number;

    // ==================================================
    
    @ApiProperty()
    @IsString()
    message: string;

}