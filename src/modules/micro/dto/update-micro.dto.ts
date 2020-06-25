import { IsString, IsBooleanString, IsNumberString } from "class-validator";


export class UpdateMicroDto {

    @IsString()
    unit_code: string;

    @IsBooleanString()
    communication: boolean;

    @IsNumberString()
    priority: number;

    @IsString()
    mark: string;

    @IsString()
    model: string;

    @IsString()
    code: string;

    @IsBooleanString()
    active: boolean;

}