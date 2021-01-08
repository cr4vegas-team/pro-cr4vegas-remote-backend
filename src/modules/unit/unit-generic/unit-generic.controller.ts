import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { Roles } from './../../auth/user/user-role.decorator';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../modules/auth/auth/jwt-auth.guard';
import { UnitExceptionMSG } from '../unit/unit-exception-msg.enum';
import { RegistryService } from './../../session/registry/registry.service';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import {
  UnitGenericRO,
  UnitsGenericsRO
} from './dto/unit-generic-response.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericExceptionMSG } from './unit-generic-exception-messages';
import { UnitGenericService } from './unit-generic.service';
import { UserRole } from '../../auth/user/user-role.enum';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('unit-generic')
@Controller('unit-generic')
export class UnitGenericController {
  constructor(
    private readonly _unitGenericService: UnitGenericService,
    private readonly _registryService: RegistryService
  ) { }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @ApiResponse({})
  @Get()
  async findAll(): Promise<UnitsGenericsRO> {
    return await this._unitGenericService.findAll();
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UnitGenericRO> {
    return await this._unitGenericService.findOneById(id);
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Post()
  async createOne(@Req() req: any, @Body() dto: UnitGenericCreateDto): Promise<UnitGenericRO> {
    const unitGenericRO = await this._unitGenericService.create(dto);
    await this._registryService.insertOne(req);
    return unitGenericRO;
  }

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiNotFoundResponse({
    description:
      UnitGenericExceptionMSG.NOT_FOUND + ' | ' + UnitExceptionMSG.NOT_FOUND,
  })
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Put()
  async updateOne(@Req() req: any, @Body() dto: UnitGenericUpdateDto): Promise<UnitGenericRO> {
    const unitGenericRO = await this._unitGenericService.update(dto);
    await this._registryService.insertOne(req);
    return unitGenericRO;
  }
}
