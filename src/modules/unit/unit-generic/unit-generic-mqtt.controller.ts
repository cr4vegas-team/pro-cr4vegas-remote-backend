import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { UnitGenericGateway } from './unit-generic.gateway';

@Controller('unit-generic-mqtt')
export class UnitGenericMqttController {
  constructor(private readonly _unitGenericGateway: UnitGenericGateway) {}

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
}
