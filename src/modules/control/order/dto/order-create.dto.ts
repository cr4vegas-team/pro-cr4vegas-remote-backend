import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class OrderCreateDto {

    @ApiProperty()
    @IsNumber()
    control: number;

    // ==================================================
    
    @ApiProperty()
    @IsString()
    message: string;

}