import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class OrderUpdateDto {

    @ApiProperty()
    @IsNumber()
    id: number

    // ==================================================

    @ApiProperty()
    @IsNumber()
    control: number;

    // ==================================================
    
    @ApiProperty()
    @IsString()
    message: string;

}