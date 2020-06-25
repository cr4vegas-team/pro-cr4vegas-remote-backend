import { IsBoolean, IsNumber, IsString } from "class-validator";


export class UpdateMicroDto {

    @IsString()
    unit_code: string;

    @IsBoolean()
    communication: boolean;

    @IsNumber()
    priority: number;

    @IsString()
    mark: string;

    @IsString()
    model: string;

    @IsString()
    code: string;

}