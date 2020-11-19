import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class OrderUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number

    // ==================================================

    @ApiProperty()
    @IsNumber()
    session: number;

    // ==================================================
    
    @ApiProperty()
    @IsString()
    message: string;

}