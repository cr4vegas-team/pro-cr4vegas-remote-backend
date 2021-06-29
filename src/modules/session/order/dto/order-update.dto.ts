import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNumber, IsString } from "class-validator";


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

    // ==================================================
    
    @ApiProperty()
    @IsIn([0, 1])
    active: number;

}