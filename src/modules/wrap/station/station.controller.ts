import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StationDto } from './station.dto';
import { StationRO, StationsRO } from './station.interfaces';
import { StationService } from './station.service';

@ApiTags('station')
@Controller('station')
export class StationController {

    constructor(
        private readonly _statioService: StationService
    ) { }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @Get()
    findAll(@Query('active') active: number): Promise<StationsRO> {
        return this._statioService.findAll(active);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiParam({ name: 'id', type: Number, required: true })
    @Get(':id')
    findOne(@Param('id') id: number, @Query('active') active: number): Promise<StationRO> {
        return this._statioService.findOne(id, active);
    }

    @Post()
    createOne(@Body() dto: StationDto): Promise<StationRO> {
        return this._statioService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: StationDto): Promise<boolean> {
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
