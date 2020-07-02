import { IsBoolean, IsNumber, IsString } from "class-validator";


export class CreateMicroDto {

    @IsNumber()
    unit_id: number;

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