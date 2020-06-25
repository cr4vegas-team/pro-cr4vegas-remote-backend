import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, ValidationPipe, ParseArrayPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UnitService } from './unit.service';
import { ReadUnitDto } from './dto/read-unit.dto';
import { CreateUnitDto, UpdateUnitDto } from './dto';
import { UnitExceptionFilter } from './exception/unit.exception';

@Controller('unit')
@UseFilters(UnitExceptionFilter)
export class UnitController {

    constructor(private readonly _unitService: UnitService) { }

    @Get()
    getUnits(): Promise<ReadUnitDto[]> {
        return this._unitService.getUnits();
    }

    @Get(':code')
    getUnitByCode(@Param('code') code: string): Promise<ReadUnitDto> {
        return this._unitService.getUnitByCode(code);
    }

}
