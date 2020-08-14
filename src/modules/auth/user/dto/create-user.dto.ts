import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(5)
    @MaxLength(250)
    password: string;

}