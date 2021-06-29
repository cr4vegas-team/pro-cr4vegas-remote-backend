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
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';
import { UserRoleGuard } from './../../auth/user/user-role.guard';
import { RegistryService } from './../../session/registry/registry.service';
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorRO, SectorsRO } from './dto/sector-response.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorExceptionMSG } from './sector-exception.msg';
import { SectorService } from './sector.service';

@ApiTags('sector')
@Controller('sector')
export class SectorController {
  constructor(
    private readonly _sectorService: SectorService,
    private readonly _registryService: RegistryService,
  ) { }

  // ==========================================================

  @Get()
  findAll(): Promise<SectorsRO> {
    return this._sectorService.findAll();
  }

  // ==========================================================

  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SectorRO> {
    return await this._sectorService.findOneWithUnits(id);
  }

  // ==========================================================

  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({
    description:
      SectorExceptionMSG.CONFLICT_CODE || SectorExceptionMSG.CONFLICT_NAME,
  })
  @Post()
  async asynccreateOne(@Req() req: any, @Body() dto: SectorCreateDto): Promise<SectorRO> {
    const sectorRO = await this._sectorService.createOne(dto);
    await this._registryService.insertOne(req);
    return sectorRO;
  }

  // ==========================================================

  @UseGuards(JwtAuthGuard, UserRoleGuard)
  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({
    description:
      SectorExceptionMSG.CONFLICT_CODE || SectorExceptionMSG.CONFLICT_NAME,
  })
  @ApiNotFoundResponse({ description: SectorExceptionMSG.NOT_FOUND })
  @Put()
  async updateOne(@Req() req: any, @Body() dto: SectorUpdateDto): Promise<SectorRO> {
    const sectorRO = await this._sectorService.updateOne(dto);
    await this._registryService.insertOne(req);
    return sectorRO;
  }
}
