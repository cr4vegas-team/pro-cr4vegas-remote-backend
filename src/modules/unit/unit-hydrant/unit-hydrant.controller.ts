

import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateUnitHydrantDto } from './dto/create-unit-hydrant.dto';
import { UpdateUnitHydrantDto } from './dto/update-unit-hydrant.dto';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
import { UnitHydrantService } from './unit-hydrant.service';



@Controller('unit-hydrant')
export class UnitHydrantController {

    constructor(private readonly unitHydrantService: UnitHydrantService) { }

    @Get()
    getAll(@Query() query: any): Promise<UnitsHydrantsRO> {
        return this.unitHydrantService.getAll(query);
    }

    @Get(':code')
    getOne(
        @Param('code') code: string,
        @Query() query: any
    ): Promise<UnitHydrantRO> {
        return this.unitHydrantService.getOneByCode(code, query);
    }

    @Post()
    create(
        @Body() createUnitHydrantDto: CreateUnitHydrantDto
    ): Promise<UnitHydrantRO> {
        return this.unitHydrantService.create(createUnitHydrantDto);
    }

    @Put(':code')
    update(
        @Param('code') code: string,
        @Body() updateUnitHydrantDto: UpdateUnitHydrantDto
    ): Promise<UnitHydrantRO> {
        return this.unitHydrantService.update(code, updateUnitHydrantDto);
    }

    @Delete(':code')
    delete(
        @Param('code') code: string,
    ): Promise<UnitHydrantRO> {
        return this.unitHydrantService.delete(code);
    }

    @Patch(':code')
    activate(
        @Param('code') code: string,
    ): Promise<UnitHydrantRO> {
        return this.unitHydrantService.activate(code);
    }

}
