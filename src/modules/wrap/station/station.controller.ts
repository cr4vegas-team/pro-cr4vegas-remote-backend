import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StationCreateDto } from './dto/station-create.dto';
import { StationUpdateDto } from './dto/station-update.dto';
import { StationRO, StationsRO } from './station.interfaces';
import { StationService } from './station.service';

@ApiTags('station')
@Controller('station')
export class StationController {

    constructor(
        private readonly _statioService: StationService
    ) { }

    @Get()
    findAll(): Promise<StationsRO> {
        return this._statioService.findAll();
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<StationRO> {
        return this._statioService.findOne(id);
    }

    @Post()
    createOne(@Body() dto: StationCreateDto): Promise<StationRO> {
        return this._statioService.createOne(dto);
    }

    @Put()
    updateOne(@Body() dto: StationUpdateDto): Promise<StationRO> {
        return this._statioService.updateOne(dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<boolean> {
        return this._statioService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<boolean> {
        return this._statioService.activateOne(id);
    }


}
