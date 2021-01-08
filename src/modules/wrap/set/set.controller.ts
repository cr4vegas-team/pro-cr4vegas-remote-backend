import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req, UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags
} from '@nestjs/swagger';
import { Roles } from '../../auth/user/user-role.decorator';
import { UserRole } from '../../auth/user/user-role.enum';
import { JwtAuthGuard } from './../../auth/auth/jwt-auth.guard';
import { UserRoleGuard } from './../../auth/user/user-role.guard';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { RegistryService } from './../../session/registry/registry.service';
import { SetCreateDto } from './dto/set-create.dto';
import { SetRO, SetsRO } from './dto/set-response.dto';
import { SetTypeUpdateDto } from './dto/set-type-update.dto';
import { SetUpdateDto } from './dto/set-update.dto';
import { SetExceptionMSG } from './set-exception.msg';
import { SetTypeEntity } from './set-type.entity';
import { SetService } from './set.service';

@UseGuards(JwtAuthGuard, UserRoleGuard)
@ApiTags('set')
@Controller('set')
export class SetController {
  constructor(
    private readonly _setService: SetService,
    private readonly _registryService: RegistryService) { }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get('all')
  findAll(): Promise<SetsRO> {
    return this._setService.findAll();
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get('one/:id')
  async findOne(@Param('id') id: number): Promise<SetRO> {
    return await this._setService.findOneWithUnits(id);
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({
    description:
      SetExceptionMSG.CONFLICT_CODE + '  | ' + SetExceptionMSG.CONFLICT_NAME,
  })
  @Post()
  async createOne(@Req() req: any, @Body() dto: SetCreateDto): Promise<SetRO> {
    const setRO = await this._setService.createOne(dto);
    await this._registryService.insertOne(req);
    return setRO;
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiNotFoundResponse({ description: SetExceptionMSG.NOT_FOUND })
  @ApiConflictResponse({
    description:
      SetExceptionMSG.CONFLICT_CODE + '  | ' + SetExceptionMSG.CONFLICT_NAME,
  })
  @Put()
  async updateOne(@Req() req: any, @Body() dto: SetUpdateDto): Promise<SetRO> {
    const setRO = await this._setService.updateOne(dto);
    await this._registryService.insertOne(req);
    return setRO;
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR, UserRole.VIEWER, UserRole.NONE])
  @Get('set-type')
  findAllSetTypes(): Promise<SetTypeEntity[]> {
    return this._setService.findAllSetTypes();
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiConflictResponse({ description: SetExceptionMSG.CONFLICT_TYPE })
  @Post('set-type')
  async insertSetType(@Req() req: any, @Body() dto: SetTypeEntity): Promise<SetTypeEntity> {
    const setType = await this._setService.insertSetType(dto);
    await this._registryService.insertOne(req);
    return setType;
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiNotFoundResponse({ description: SetExceptionMSG.NOT_FOUND_TYPE })
  @Delete('set-type/:name')
  async deleteSetType(@Req() req: any, @Param('name') name: string): Promise<boolean> {
    const res = await this._setService.deleteSetType(name);
    await this._registryService.insertOne(req);
    return res;
  }

  // ==================================================

  @Roles([UserRole.ADMIN, UserRole.MODERATOR])
  @ApiNotFoundResponse({ description: SetExceptionMSG.NOT_FOUND_TYPE })
  @ApiBadRequestResponse({ description: SetExceptionMSG.SET_TYPE_LINKED })
  @Put('set-type')
  async updateSetType(@Req() req: any, @Body() dto: SetTypeUpdateDto): Promise<SetTypeEntity> {
    const res = await this._setService.updateSetType(dto);
    await this._registryService.insertOne(req);
    return res;
  }
}
