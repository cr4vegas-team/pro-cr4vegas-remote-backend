import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { UnitHydrantGateway } from './unit-hydrant.gateway';

@Controller()
export class UnitHydrantMqttController {
  constructor(private readonly _unitHydrantGateway: UnitHydrantGateway) {}

  @MessagePattern('n/u/h/+')
  async getNotifications(
    @Payload() message: number[],
    @Ctx() context: MqttContext,
  ): Promise<any> {
    console.log(message);
    const mqttPacket = JSON.stringify({
      topic: context.getTopic(),
      message,
    });
    this._unitHydrantGateway.emit(mqttPacket);
  }
}
