import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { UnitExceptionMSG } from '../unit/unit-exception-msg.enum';
import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import {
  UnitHydrantRO,
  UnitsHydrantsRO
} from './dto/unit-hydrant-response.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitHydrantService } from './unit-hydrant.service';

@UseGuards(JwtAuthGuard)
@ApiTags('unit-hydrant')
@Controller('unit-hydrant')
export class UnitHydrantController {
  constructor(private readonly _unitHydrantService: UnitHydrantService) {}

  @Get()
  findAll(): Promise<UnitsHydrantsRO> {
    return this._unitHydrantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UnitHydrantRO> {
    return this._unitHydrantService.findOneById(id);
  }

  @Post()
  createOne(@Body() dto: UnitHydrantCreateDto): Promise<UnitHydrantRO> {
    return this._unitHydrantService.createOne(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiNotFoundResponse({
    description:
      UnitHydrantExceptionMSG.NOT_FOUND + ' | ' + UnitExceptionMSG.NOT_FOUND,
  })
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Put()
  updateOne(@Body() dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO> {
    return this._unitHydrantService.updateOne(dto);
  }
}
