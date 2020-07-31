import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { UnitHydrantRO, UnitsHydrantsRO } from './unit-hydrant.interfaces';
import { UnitHydrantService } from './unit-hydrant.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UnitHydrantDto } from './unit-hydrant.dto';

@ApiTags('unit-hydrant')
@Controller('unit-hydrant')
export class UnitHydrantController {

    constructor(private readonly _unitHydrantService: UnitHydrantService) { }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @ApiQuery({ name: 'limit', type: Number, required: false })
    @Get()
    findAll(@Query() query: Object): Promise<UnitsHydrantsRO> {
        return this._unitHydrantService.findAll(query);
    }

    @ApiQuery({ name: 'active', type: Number, required: false })
    @ApiQuery({ name: 'id', type: Number, required: false })
    @Get('one')
    findOne(@Query() query: Object): Promise<UnitHydrantRO> {
        return this._unitHydrantService.findOneById(query);
    }

    @Post()
    createOne(@Body() dto: UnitHydrantDto): Promise<UnitHydrantRO> {
        return this._unitHydrantService.createOne(dto);
    }

    @Put(':id')
    updateOne(@Param('id') id: number, @Body() dto: UnitHydrantDto): Promise<UnitHydrantRO> {
        return this._unitHydrantService.updateOne(id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<Boolean> {
        return this._unitHydrantService.deleteOne(id);
    }

    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<Boolean> {
        return this._unitHydrantService.activateOne(id);
    }

}
