import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorRO, SectorsRO } from './sector.interfaces';
import { SectorService } from './sector.service';

@ApiTags('sector')
@UseGuards(JwtAuthGuard)
@Controller('sector')
export class SectorController {

    constructor(
        private readonly _sectorService: SectorService
    ) { }

    // ==========================================================
    
    @Get()
    findAll(): Promise<SectorsRO> {
        return this._sectorService.findAll();
    }

    // ==========================================================
    
    @ApiParam({ name: 'id', type: Number, required: true })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<SectorRO> {
        return this._sectorService.findOneWithUnits(id);
    }

    // ==========================================================
    
    @Post()
    createOne(@Body() dto: SectorCreateDto): Promise<SectorRO> {
        return this._sectorService.createOne(dto);
    }

    // ==========================================================
    
    @Put()
    updateOne(@Body() dto: SectorUpdateDto): Promise<SectorRO> {
        return this._sectorService.updateOne(dto);
    }

    // ==========================================================
    
    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<boolean> {
        return this._sectorService.deleteOne(id);
    }

    // ==========================================================
    
    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<boolean> {
        return this._sectorService.activateOne(id);
    }

}
