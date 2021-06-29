import { UserRoleGuard } from './../../auth/user/user-role.guard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/auth/jwt-auth.guard';
import { UnitExceptionMSG } from '../unit/unit-exception-msg.enum';
import { RegistryService } from './../../session/registry/registry.service';
import { UnitPondCreateDto } from './dto/unit-pond-create.dto';
import { UnitPondRO, UnitsPondsRO } from './dto/unit-pond-response.dto';
import { UnitPondUpdateDto } from './dto/unit-pond-update.dto';
import { UnitPondExceptionMSG } from './unit-pond-exception-messages';
import { UnitPondService } from './unit-pond.service';
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';

@ApiTags('unit-pond')
@Controller('unit-pond')
export class UnitPondController {
  constructor(
    private readonly _unitPondService: UnitPondService,
    private readonly _registryService: RegistryService,
  ) { }

  @Get()
  findAll(): Promise<UnitsPondsRO> {
    return this._unitPondService.findAll();
  }

  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UnitPondRO> {
    return await this._unitPondService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Post()
  async createOne(@Req() req: any, @Body() dto: UnitPondCreateDto): Promise<UnitPondRO> {
    const unitPondRO = await this._unitPondService.createOne(dto);
    await this._registryService.insertOne(req);
    return unitPondRO;
  }

  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiNotFoundResponse({
    description:
      UnitPondExceptionMSG.NOT_FOUND + ' | ' + UnitExceptionMSG.NOT_FOUND,
  })
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Put()
  async updateOne(@Req() req: any, @Body() dto: UnitPondUpdateDto): Promise<UnitPondRO> {
    const unitPondRO = await this._unitPondService.updateOne(dto);
    await this._registryService.insertOne(req);
    return unitPondRO;
  }
}
