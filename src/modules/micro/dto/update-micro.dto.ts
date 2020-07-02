import { IsBoolean, IsNumber, IsString } from "class-validator";


export class UpdateMicroDto {

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