import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReadUnitDto } from './dto/read-unit.dto';
import { UnitService } from './unit.service';
import { query } from 'express';
import { UnitsRO, UnitRO } from './unit.interfaces';

@Controller('unit')
export class UnitController {

    constructor(private readonly _unitService: UnitService) { }

    @Get()
    findAll(@Query() query: Object): Promise<UnitsRO> {
        return this._unitService.getAll(query);
    }

    @Get(':code')
    findOneByCode(@Param('code') code: string, @Query('active') active?: boolean): Promise<UnitRO> {
        return this._unitService.getOneByCode(code, active);
    }

}
