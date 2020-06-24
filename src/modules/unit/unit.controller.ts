import { Controller, Get, Param, Post, Body, Put, Delete, UseFilters, ValidationPipe, ParseArrayPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UnitService } from './unit.service';
import { ReadUnitDto } from './dto/read-unit.dto';
import { CreateUnitDto, UpdateUnitDto } from './dto';
import { UnitExceptionFilter } from './exception/unit.exception';

@Controller('unit')
// @UseFilters(UnitExceptionFilter)
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

    @Post()
    createUnit(@Body() dto: CreateUnitDto): Promise<ReadUnitDto> {
        return this._unitService.createUnit(dto);
    }

    @Put(':code')
    updateUnit(@Param('code') code: string, @Body() dto: UpdateUnitDto): Promise<ReadUnitDto> {
        return this._unitService.updateUnit(code, dto);
    }

    @Delete()
    deleteUnit(code: string): Promise<boolean> {
        return this._unitService.deleteUnit(code);
    }

}
