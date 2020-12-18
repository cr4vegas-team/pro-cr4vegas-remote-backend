import { UnitGenericGateway } from './unit-generic.gateway';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/auth/jwt-auth.guard';
import { UnitExceptionMSG } from '../unit/unit-exception-msg.enum';
import { UnitGenericCreateDto } from './dto/unit-generic-create.dto';
import {
  UnitGenericRO,
  UnitsGenericsRO,
} from './dto/unit-generic-response.dto';
import { UnitGenericUpdateDto } from './dto/unit-generic-update.dto';
import { UnitGenericExceptionMSG } from './unit-generic-exception-messages';
import { UnitGenericService } from './unit-generic.service';
import { MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';

@UseGuards(JwtAuthGuard)
@ApiTags('unit-generic')
@Controller('unit-generic')
export class UnitGenericController {
  constructor(
    private readonly _unitGenericService: UnitGenericService,
    private readonly _unitGenericGateway: UnitGenericGateway,
  ) {}

  @MessagePattern('n/u/g/+')
  async getNotifications(
    @Payload() message: number[],
    @Ctx() context: MqttContext,
  ): Promise<any> {
    const mqttPacket = JSON.stringify({
      topic: context.getTopic(),
      message,
    });
    this._unitGenericGateway.emit(mqttPacket);
  }

  // ==========================================================

  @ApiResponse({})
  @Get()
  findAll(): Promise<UnitsGenericsRO> {
    return this._unitGenericService.findAll();
  }

  // ==========================================================

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UnitGenericRO> {
    return this._unitGenericService.findOneById(id);
  }

  // ==========================================================

  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Post()
  createOne(@Body() dto: UnitGenericCreateDto): Promise<UnitGenericRO> {
    return this._unitGenericService.create(dto);
  }

  // ==========================================================

  @ApiNotFoundResponse({
    description:
      UnitGenericExceptionMSG.NOT_FOUND + ' | ' + UnitExceptionMSG.NOT_FOUND,
  })
  @ApiConflictResponse({ description: UnitExceptionMSG.CONFLICT })
  @Put()
  updateOne(@Body() dto: UnitGenericUpdateDto): Promise<UnitGenericRO> {
    return this._unitGenericService.update(dto);
  }
}
