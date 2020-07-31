import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UnitRO, UnitsRO } from './unit.interfaces';
import { UnitService } from './unit.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UnitDto } from './unit.dto';

@ApiTags('unit')
@Controller('unit')
export class UnitController {

    constructor(private readonly _unitService: UnitService) { }

    @ApiQuery({name: 'active', type: Number, required: false})
    @ApiQuery({name: 'id', type: Number, required: false})
    @ApiQuery({name: 'limit', type: Number, required: false})
    @Get()
    findAll(@Query() query: Object): Promise<UnitsRO> {
        return this._unitService.getAll(query);
    }

    @ApiQuery({name: 'active', type: Number, required: false})
    @ApiQuery({name: 'id', type: Number, required: false})
    @Get('one')
    findOne(@Query() query: Object): Promise<UnitRO> {
        return this._unitService.findOne(query);
    }

    @Post()
    createOne(@Body() dto: UnitDto): Promise<UnitRO> {
        return this._unitService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: UnitDto): Promise<UnitRO> {
        return this._unitService.updateOne(id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<Boolean> {
        return this._unitService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<Boolean> {
        return this._unitService.activateOne(id);
    }

}
