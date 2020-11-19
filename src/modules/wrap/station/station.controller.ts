import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put
} from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiNotFoundResponse,

    ApiTags
} from '@nestjs/swagger';
import { StationCreateDto } from './dto/station-create.dto';
import { StationRO, StationsRO } from './dto/station-response.dto';
import { StationUpdateDto } from './dto/station-update.dto';
import { StationExceptionMSG } from './station-exception.msg';
import { StationService } from './station.service';

@ApiTags('station')
@Controller('station')
export class StationController {
  constructor(private readonly _statioService: StationService) {}

  // ==================================================
  
  @Get()
  findAll(): Promise<StationsRO> {
    return this._statioService.findAll();
  }

  // ==================================================
  
  @Get(':id')
  findOne(@Param('id') id: number): Promise<StationRO> {
    return this._statioService.findOneWithUnits(id);
  }

  // ==================================================
  
  @ApiConflictResponse({
    description:
      StationExceptionMSG.CONFLICT_CODE +
      ' | ' +
      StationExceptionMSG.CONFLICT_NAME,
  })
  @Post()
  createOne(@Body() dto: StationCreateDto): Promise<StationRO> {
    return this._statioService.createOne(dto);
  }

  // ==================================================
  
  @ApiConflictResponse({
    description:
      StationExceptionMSG.CONFLICT_CODE +
      ' | ' +
      StationExceptionMSG.CONFLICT_NAME,
  })
  @ApiNotFoundResponse({ description: StationExceptionMSG.NOT_FOUND })
  @Put()
  updateOne(@Body() dto: StationUpdateDto): Promise<StationRO> {
    return this._statioService.updateOne(dto);
  }

  // ==================================================
  
  @ApiNotFoundResponse({ description: StationExceptionMSG.NOT_FOUND })
  @Delete(':id')
  deleteOne(@Param('id') id: number): Promise<boolean> {
    return this._statioService.deleteOne(id);
  }

  // ==================================================
  
  @ApiNotFoundResponse({ description: StationExceptionMSG.NOT_FOUND })
  @Patch(':id')
  activateOne(@Param('id') id: number): Promise<boolean> {
    return this._statioService.activateOne(id);
  }
}
