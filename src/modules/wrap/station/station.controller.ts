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
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { RegistryService } from './../../session/registry/registry.service';
import { StationCreateDto } from './dto/station-create.dto';
import { StationRO, StationsRO } from './dto/station-response.dto';
import { StationUpdateDto } from './dto/station-update.dto';
import { StationExceptionMSG } from './station-exception.msg';
import { StationService } from './station.service';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('station')
@Controller('station')
export class StationController {
  constructor(
    private readonly _statioService: StationService,
    private readonly _registryService: RegistryService) { }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get()
  findAll(): Promise<StationsRO> {
    return this._statioService.findAll();
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get(':id')
  findOne(@Param('id') id: number): Promise<StationRO> {
    return this._statioService.findOneWithUnits(id);
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({
    description:
      StationExceptionMSG.CONFLICT_CODE +
      ' | ' +
      StationExceptionMSG.CONFLICT_NAME,
  })
  @Post()
  async createOne(@Req() req: any, @Body() dto: StationCreateDto): Promise<StationRO> {
    const stationRO = await this._statioService.createOne(dto);
    await this._registryService.insertOne(req);
    return stationRO;
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({
    description:
      StationExceptionMSG.CONFLICT_CODE +
      ' | ' +
      StationExceptionMSG.CONFLICT_NAME,
  })
  @ApiNotFoundResponse({ description: StationExceptionMSG.NOT_FOUND })
  @Put()
  async updateOne(@Req() req: any, @Body() dto: StationUpdateDto): Promise<StationRO> {
    const stationRO = await this._statioService.updateOne(dto);
    await this._registryService.insertOne(req);
    return stationRO;
  }
}
