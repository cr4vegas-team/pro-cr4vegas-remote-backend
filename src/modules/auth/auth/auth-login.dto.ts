import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class AuthLoginDto {
    
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(45)
    @IsOptional()
    username?: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    password: string;
}