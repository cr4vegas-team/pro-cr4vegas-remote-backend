import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { UnitPondGateway } from './unit-pond.gateway';

@Controller()
export class UnitPondMqttController {
  constructor(private readonly _unitPondGateway: UnitPondGateway) {}

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
}
