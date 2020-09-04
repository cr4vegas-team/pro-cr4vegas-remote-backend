import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam, ApiBody } from '@nestjs/swagger';
import { UnitHydrantUpdateDto } from '../unit-hydrant/dto/unit-hydrant-update.dto';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericRO, UnitsGenericsRO } from './unit-generic.interfaces';
import { UnitGenericService } from './unit-generic.service';

@Controller('unit-generic')
export class UnitGenericController {

    constructor(private readonly _unitGenericService: UnitGenericService) { }

    @Get()
    findAll(): Promise<UnitsGenericsRO> {
        return this._unitGenericService.findAll();
    }

    @ApiParam({ name: 'id', type: String, required: true })
    @Get(':id')
    findOne(@Param('id') id: number): Promise<UnitGenericRO> {
        return this._unitGenericService.findOneById(id);
    }

    @Post()
    createOne(@Body() dto: UnitGenericCreateDto): Promise<UnitGenericRO> {
        return this._unitGenericService.createOne(dto);
    }

    @ApiBody({ type: UnitHydrantUpdateDto })
    @Put()
    updateOne(@Body() dto: UnitGenericUpdateDto): Promise<UnitGenericRO> {
        return this._unitGenericService.updateOne(dto);
    }

}
