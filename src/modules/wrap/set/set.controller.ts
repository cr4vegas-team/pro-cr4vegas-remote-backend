import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags
} from '@nestjs/swagger';
import { SetCreateDto } from './dto/set-create.dto';
import { SetRO, SetsRO } from './dto/set-response.dto';
import { SetTypeUpdateDto } from './dto/set-type-update.dto';
import { SetUpdateDto } from './dto/set-update.dto';
import { SetExceptionMSG } from './set-exception.msg';
import { SetTypeEntity } from './set-type.entity';
import { SetService } from './set.service';

@ApiTags('set')
@Controller('set')
export class SetController {
  constructor(private readonly _setService: SetService) {}

  // ==================================================

  @Get('all')
  findAll(): Promise<SetsRO> {
    return this._setService.findAll();
  }

  // ==================================================

  @Get('one/:id')
  findOne(@Param('id') id: number): Promise<SetRO> {
    return this._setService.findOneWithUnits(id);
  }

  // ==================================================

  @ApiConflictResponse({
    description:
      SetExceptionMSG.CONFLICT_CODE + '  | ' + SetExceptionMSG.CONFLICT_NAME,
  })
  @Post()
  createOne(@Body() dto: SetCreateDto): Promise<SetRO> {
    return this._setService.createOne(dto);
  }

  // ==================================================

  @ApiNotFoundResponse({ description: SetExceptionMSG.NOT_FOUND })
  @ApiConflictResponse({
    description:
      SetExceptionMSG.CONFLICT_CODE + '  | ' + SetExceptionMSG.CONFLICT_NAME,
  })
  @Put()
  updateOne(@Body() dto: SetUpdateDto): Promise<SetRO> {
    return this._setService.updateOne(dto);
  }

  // ==================================================

  @Get('set-type')
  findAllSetTypes(): Promise<SetTypeEntity[]> {
    return this._setService.findAllSetTypes();
  }

  // ==================================================

  @ApiConflictResponse({ description: SetExceptionMSG.CONFLICT_TYPE })
  @Post('set-type')
  insertSetType(@Body() dto: SetTypeEntity): Promise<SetTypeEntity> {
    return this._setService.insertSetType(dto);
  }

  // ==================================================

  @ApiNotFoundResponse({ description: SetExceptionMSG.NOT_FOUND_TYPE })
  @Delete('set-type/:name')
  deleteSetType(@Param('name') name: string): Promise<boolean> {
    return this._setService.deleteSetType(name);
  }

  // ==================================================

  @ApiNotFoundResponse({ description: SetExceptionMSG.NOT_FOUND_TYPE })
  @ApiBadRequestResponse({ description: SetExceptionMSG.SET_TYPE_LINKED })
  @Put('set-type')
  updateSetType(@Body() dto: SetTypeUpdateDto): Promise<SetTypeEntity> {
    return this._setService.updateSetType(dto);
  }
}
