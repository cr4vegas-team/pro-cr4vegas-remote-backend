import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SectorDto } from './sector.dto';
import { SectorRO, SectorsRO } from './sector.interfaces';
import { SectorService } from './sector.service';

@Controller('sector')
export class SectorController {

    constructor(
        private readonly _sectorService: SectorService
    ) { }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @Get()
    findAll(@Query() query: Object): Promise<SectorsRO> {
        return this._sectorService.findAll(query);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @Get('one')
    findOne(@Query() query: Object): Promise<SectorRO> {
        return this._sectorService.findOne(query);
    }

    @Post()
    createOne(@Body() dto: SectorDto): Promise<SectorRO> {
        return this._sectorService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: SectorDto): Promise<SectorRO> {
        return this._sectorService.updateOne(id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<Boolean> {
        return this._sectorService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<Boolean> {
        return this._sectorService.activateOne(id);
    }


}
