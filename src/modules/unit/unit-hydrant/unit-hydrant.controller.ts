

import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ReadUnitHydrantDto } from './dto';
import { CreateUnitHydrantDto } from './dto/create-unit-hydrant.dto';
import { UpdateUnitHydrantDto } from './dto/update-unit-hydrant.dto';
import { UnitHydrantExceptionFilter } from './exception/unit-hydrant.exception.filter';
import { UnitHydrantService } from './unit-hydrant.service';



@Controller('unit-hydrant')
@UseFilters(UnitHydrantExceptionFilter)
export class UnitHydrantController {

    constructor(private readonly unitHydrantService: UnitHydrantService) { }

    @Get()
    findAll(): Promise<ReadUnitHydrantDto[]> {
        return this.unitHydrantService.findAll();
    }

    @Get(':code')
    findOne(
        @Param('code') code: string
    ): Promise<ReadUnitHydrantDto> {
        return this.unitHydrantService.findOne(code);
    }

    @Post()
    create(
        @Body() createUnitHydrantDto: CreateUnitHydrantDto
    ): Promise<ReadUnitHydrantDto> {
        return this.unitHydrantService.create(createUnitHydrantDto);
    }

    @Put(':code')
    update(
        @Param('code') code: string,
        @Body() updateUnitHydrantDto: UpdateUnitHydrantDto
    ): Promise<ReadUnitHydrantDto> {
        return this.unitHydrantService.update(code, updateUnitHydrantDto);
    }

}
