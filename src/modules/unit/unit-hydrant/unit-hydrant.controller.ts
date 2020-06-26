

import { Body, Controller, Get, Param, Post, Put, UseFilters, ValidationPipe, Patch, Delete } from '@nestjs/common';
import { ReadUnitHydrantDto } from './dto';
import { CreateUnitHydrantDto } from './dto/create-unit-hydrant.dto';
import { UpdateUnitHydrantDto } from './dto/update-unit-hydrant.dto';
import { UnitHydrantService } from './unit-hydrant.service';



@Controller('unit-hydrant')
export class UnitHydrantController {

    constructor(private readonly unitHydrantService: UnitHydrantService) { }

    @Get()
    getAll(): Promise<ReadUnitHydrantDto[]> {
        return this.unitHydrantService.getAll();
    }

    @Get(':code')
    getOne(
        @Param('code') code: string
    ): Promise<ReadUnitHydrantDto> {
        return this.unitHydrantService.getOneByCode(code);
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

    @Delete(':code')
    delete(
        @Param('code') code: string,
    ): Promise<boolean> {
        return this.unitHydrantService.delete(code);
    }

    @Patch(':code')
    activate(
        @Param('code') code: string,
    ): Promise<boolean> {
        return this.unitHydrantService.activate(code);
    }

}
