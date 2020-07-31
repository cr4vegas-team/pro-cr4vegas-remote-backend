import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { StationDto } from './station.dto';
import { StationRO, StationsRO } from './station.interfaces';
import { StationService } from './station.service';

@Controller('station')
export class StationController {

    constructor(
        private readonly _statioService: StationService
    ) { }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @Get()
    findAll(@Query() query: Object): Promise<StationsRO> {
        return this._statioService.findAll(query);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @Get('one')
    findOne(@Query() query: Object): Promise<StationRO> {
        return this._statioService.findOne(query);
    }

    @Post()
    createOne(@Body() dto: StationDto): Promise<StationRO> {
        return this._statioService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: StationDto): Promise<StationRO> {
        return this._statioService.updateOne(id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<Boolean> {
        return this._statioService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<Boolean> {
        return this._statioService.activateOne(id);
    }


}
