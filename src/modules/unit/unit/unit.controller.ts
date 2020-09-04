import { Controller, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth/jwt-auth.guard';
import { UnitService } from './unit.service';

@UseGuards(JwtAuthGuard)
@Controller('unit')
export class UnitController {

    constructor(private readonly _unitService: UnitService) { }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Delete(':id')
    deleteOne(@Param('id') id: number): Promise<boolean> {
        return this._unitService.delete(id);
    }

    @ApiParam({ name: 'id', type: Number, required: true })
    @Patch(':id')
    activateOne(@Param('id') id: number): Promise<boolean> {
        return this._unitService.activate(id);
    }

}
