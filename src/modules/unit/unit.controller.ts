import { Controller, Get, Param } from '@nestjs/common';
import { ReadUnitDto } from './dto/read-unit.dto';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {

    constructor(private readonly _unitService: UnitService) { }

    @Get()
    getAll(): Promise<ReadUnitDto[]> {
        return this._unitService.getAll();
    }

    @Get(':code')
    getUnitByCode(@Param('code') code: string): Promise<ReadUnitDto> {
        return this._unitService.getOneByCode(code);
    }

}
