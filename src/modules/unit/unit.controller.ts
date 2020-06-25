import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { ReadUnitDto } from './dto/read-unit.dto';
import { UnitExceptionFilter } from './exception/unit.exception';
import { UnitService } from './unit.service';

@Controller('unit')
@UseFilters(UnitExceptionFilter)
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
