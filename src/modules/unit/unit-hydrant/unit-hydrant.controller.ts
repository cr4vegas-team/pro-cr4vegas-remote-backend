/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags
} from '@nestjs/swagger';
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { UnitExceptionMSG } from '../unit/unit-exception-msg.enum';
import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { RegistryService } from './../../session/registry/registry.service';
import { UnitHydrantCreateDto } from './dto/unit-hydrant-create.dto';
import {
  UnitHydrantRO,
  UnitsHydrantsRO
} from './dto/unit-hydrant-response.dto';
import { UnitHydrantUpdateDto } from './dto/unit-hydrant-update.dto';
import { UnitHydrantExceptionMSG } from './unit-hydrant-exception-messages';
import { UnitHydrantService } from './unit-hydrant.service';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('unit-hydrant')
@Controller('unit-hydrant')
export class UnitHydrantController {

  constructor(
    private readonly _unitHydrantService: UnitHydrantService,
    private readonly _registryService: RegistryService) { }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get()
  findAll(): Promise<UnitsHydrantsRO> {
    return this._unitHydrantService.findAll();
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UnitHydrantRO> {
    return await this._unitHydrantService.findOneById(id);
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @Post()
  async createOne(@Req() req: any, @Body() dto: UnitHydrantCreateDto): Promise<UnitHydrantRO> {
    const unitHydrantRO = await this._unitHydrantService.createOne(dto);
    await this._registryService.insertOne(req);
    return unitHydrantRO;
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiNotFoundResponse({
    description:
      UnitHydrantExceptionMSG.NOT_FOUND + ' | ' + UnitExceptionMSG.NOT_FOUND,
  })
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Put()
  async updateOne(@Req() req: any, @Body() dto: UnitHydrantUpdateDto): Promise<UnitHydrantRO> {
    const unitHydrantRO = await this._unitHydrantService.updateOne(dto);
    await this._registryService.insertOne(req);
    return unitHydrantRO;
  }

}
