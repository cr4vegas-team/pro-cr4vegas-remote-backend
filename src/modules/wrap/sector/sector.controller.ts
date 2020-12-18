import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { SectorCreateDto } from './dto/sector-create.dto';
import { SectorRO, SectorsRO } from './dto/sector-response.dto';
import { SectorUpdateDto } from './dto/sector-update.dto';
import { SectorExceptionMSG } from './sector-exception.msg';
import { SectorService } from './sector.service';

@ApiTags('sector')
@UseGuards(JwtAuthGuard)
@Controller('sector')
export class SectorController {
  constructor(
    private readonly _sectorService: SectorService,
  ) {}

  // ==========================================================

  @Get()
  findAll(): Promise<SectorsRO> {
    return this._sectorService.findAll();
  }

  // ==========================================================

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SectorRO> {
    return this._sectorService.findOneWithUnits(id);
  }

  // ==========================================================

  @ApiConflictResponse({
    description:
      SectorExceptionMSG.CONFLICT_CODE || SectorExceptionMSG.CONFLICT_NAME,
  })
  @Post()
  createOne(@Body() dto: SectorCreateDto): Promise<SectorRO> {
    return this._sectorService.createOne(dto);
  }

  // ==========================================================

  @ApiConflictResponse({
    description:
      SectorExceptionMSG.CONFLICT_CODE || SectorExceptionMSG.CONFLICT_NAME,
  })
  @ApiNotFoundResponse({ description: SectorExceptionMSG.NOT_FOUND })
  @Put()
  updateOne(@Body() dto: SectorUpdateDto): Promise<SectorRO> {
    return this._sectorService.updateOne(dto);
  }

  // ==========================================================

  @ApiNotFoundResponse({ description: SectorExceptionMSG.NOT_FOUND })
  @Delete(':id')
  deleteOne(@Param('id') id: number): Promise<boolean> {
    return this._sectorService.deleteOne(id);
  }

  // ==========================================================

  @ApiNotFoundResponse({ description: SectorExceptionMSG.NOT_FOUND })
  @Patch(':id')
  activateOne(@Param('id') id: number): Promise<boolean> {
    return this._sectorService.activateOne(id);
  }
}
