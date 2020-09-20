import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UnitPondCreateDto } from './dto/unit-pond-create.dto';
import { UnitPondUpdateDto } from './dto/unit-pond-update.dto';
import { UnitPondRO, UnitsPondsRO } from './unit-pond.interfaces';
import { UnitPondService } from './unit-pond.service';

@ApiTags('unit-pond')
@Controller('unit-pond')
export class UnitPondController {

    constructor(
        private readonly _unitPondService: UnitPondService,
    ) { }

    // ==========================================================
    
    @Get()
    findAll(): Promise<UnitsPondsRO> {
        return this._unitPondService.findAll();
    }

    // ==========================================================
    
    @ApiParam({ name: 'id', type: String, required: true })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<UnitPondRO> {
        return this._unitPondService.findOneById(id);
    }

    // ==========================================================
    
    @Post()
    createOne(@Body() dto: UnitPondCreateDto): Promise<UnitPondRO> {
        console.log(dto);
        return this._unitPondService.createOne(dto);
    }

    // ==========================================================
    
    @ApiBody({ type: UnitPondUpdateDto })
    @Put()
    updateOne(@Body() dto: UnitPondUpdateDto): Promise<UnitPondRO> {
        return this._unitPondService.updateOne(dto);
    }

}
