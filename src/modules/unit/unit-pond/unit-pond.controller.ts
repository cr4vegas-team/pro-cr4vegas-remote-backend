import { UnitPondGateway } from './unit-pond.gateway';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnitExceptionMSG } from '../unit/unit-exception-msg.enum';
import { UnitPondCreateDto } from './dto/unit-pond-create.dto';
import { UnitPondRO, UnitsPondsRO } from './dto/unit-pond-response.dto';
import { UnitPondUpdateDto } from './dto/unit-pond-update.dto';
import { UnitPondExceptionMSG } from './unit-pond-exception-messages';
import { UnitPondService } from './unit-pond.service';
import {
  MessagePattern,
  Payload,
  Ctx,
  MqttContext,
} from '@nestjs/microservices';

@ApiTags('unit-pond')
@Controller('unit-pond')
export class UnitPondController {
  constructor(
    private readonly _unitPondService: UnitPondService,
    private readonly _unitPondGateway: UnitPondGateway,
  ) {}

  @MessagePattern('n/u/p/+') // node/unit/pond/+
  async getNotifications(
    @Payload() message: number[],
    @Ctx() context: MqttContext,
  ): Promise<any> {
    const mqttPacket = JSON.stringify({
      topic: context.getTopic(),
      message,
    });
    this._unitPondGateway.emit(mqttPacket);
  }

  // ==========================================================

  @Get()
  findAll(): Promise<UnitsPondsRO> {
    return this._unitPondService.findAll();
  }

  // ==========================================================

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UnitPondRO> {
    return this._unitPondService.findOneById(id);
  }

  // ==========================================================

  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Post()
  createOne(@Body() dto: UnitPondCreateDto): Promise<UnitPondRO> {
    return this._unitPondService.createOne(dto);
  }

  // ==========================================================

  @ApiNotFoundResponse({
    description:
      UnitPondExceptionMSG.NOT_FOUND + ' | ' + UnitExceptionMSG.NOT_FOUND,
  })
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Put()
  updateOne(@Body() dto: UnitPondUpdateDto): Promise<UnitPondRO> {
    return this._unitPondService.updateOne(dto);
  }
}
