import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/auth/jwt-auth.guard';
import { UnitsRO } from './dto/unit-response.dto';
import { UnitService } from './unit.service';

@ApiTags('unit')
@UseGuards(JwtAuthGuard)
@Controller('unit')
export class UnitController {
  constructor(private readonly _unitService: UnitService) {}

  // ==================================================

  @Get()
  findAll(): Promise<UnitsRO> {
    return this._unitService.findAll();
  }
}
