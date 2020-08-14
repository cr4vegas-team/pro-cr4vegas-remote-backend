import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth/jwt-auth.guard';
import { UnitHydrantDto } from './unit-hydrant.dto';
import { UnitHydrantEntity } from './unit-hydrant.entity';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
import { UnitHydrantService } from './unit-hydrant.service';

@ApiTags('unit-hydrant')
@UseGuards(JwtAuthGuard)
@Controller('unit-hydrant')
export class UnitHydrantController {

    constructor(private readonly _unitHydrantService: UnitHydrantService) { }

    @ApiQuery({ name: 'active', type: Boolean, required: false })
    @Get()
    findAll(@Query('active') active: number): Promise<UnitsHydrantsRO> {
        return this._unitHydrantService.findAll(active);
    }

    @ApiParam({ name: 'code', type: String, required: true })
    @ApiQuery({ name: 'active', type: Boolean, required: false })
    @Get(':code')
    findOne(@Param('code') code: string, @Query('active') active: number): Promise<UnitHydrantRO> {
        return this._unitHydrantService.findOneByCode(code, active);
    }

    @Post()
    createOne(@Body() dto: UnitHydrantDto): Promise<UnitHydrantRO> {
        return this._unitHydrantService.createOne(dto);
    }

    @Put(':code')
    updateOne(@Param('code') code: string, @Body() dto: UnitHydrantDto): Promise<boolean> {
        return this._unitHydrantService.updateOne(code, dto);
    }

    @Delete(':code')
    deleteOne(@Param('code') code: string): Promise<boolean> {
        return this._unitHydrantService.deleteOne(code);
    }

    @Patch(':code')
    activateOne(@Param('code') code: string): Promise<boolean> {
        return this._unitHydrantService.activateOne(code);
    }

}
