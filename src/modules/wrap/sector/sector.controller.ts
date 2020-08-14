import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth/jwt-auth.guard';
import { SectorDto } from './sector.dto';
import { SectorRO, SectorsRO } from './sector.interfaces';
import { SectorService } from './sector.service';

@ApiTags('sector')
@UseGuards(JwtAuthGuard)
@Controller('sector')
export class SectorController {

    constructor(
        private readonly _sectorService: SectorService
    ) { }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @Get()
    findAll(@Query('active') active: number): Promise<SectorsRO> {
        return this._sectorService.findAll(active);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiParam({ name: 'id', type: Number, required: true })
    @Get(':id')
    findOne(@Param('id') id: number, @Query('active') active: number): Promise<SectorRO> {
        return this._sectorService.findOne(id, active);
    }

    @Post()
    createOne(@Body() dto: SectorDto): Promise<SectorRO> {
        return this._sectorService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: SectorDto): Promise<boolean> {
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
