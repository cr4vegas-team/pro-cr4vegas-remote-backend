import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
import { UnitHydrantService } from './unit-hydrant.service';

@ApiTags('unit-hydrant')
@UseGuards(JwtAuthGuard)
@Controller('unit-hydrant')
export class UnitHydrantController {

    constructor(private readonly _unitHydrantService: UnitHydrantService) { }

    // ==========================================================

    @Get()
    findAll(): Promise<UnitsHydrantsRO> {
        return this._unitHydrantService.findAll();
    }

    // ==========================================================

    @ApiParam({ name: 'id', type: String, required: true })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<UnitHydrantRO> {
        return this._unitHydrantService.findOneById(id);
    }

    // ==========================================================

    @Post()
    createOne(@Body() dto: UnitHydrantCreateDto): Promise<UnitHydrantRO> {
        return this._unitHydrantService.createOne(dto);
    }

    // ==========================================================

    @ApiBody({ type: UnitHydrantUpdateDto })
    @Put()
    updateOne(@Body() dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO> {
        return this._unitHydrantService.updateOne(dto);
    }

}
