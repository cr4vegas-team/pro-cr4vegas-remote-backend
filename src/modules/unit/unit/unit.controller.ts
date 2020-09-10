import { Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/auth/jwt-auth.guard';
import { UnitsRO } from './unit.interfaces';
import { UnitService } from './unit.service';

@UseGuards(JwtAuthGuard)
@Controller('unit')
export class UnitController {

    constructor(private readonly _unitService: UnitService) { }

    @Get()
    findAll(): Promise<UnitsRO> {
        return this._unitService.findAll();
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Delete(':id')
    delete(@Param('id') id: number): Promise<boolean> {
        return this._unitService.delete(id);
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Patch(':id')
    activate(@Param('id') id: number): Promise<boolean> {
        return this._unitService.activate(id);
    }

}
