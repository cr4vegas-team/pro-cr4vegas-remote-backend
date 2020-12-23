import { Test, TestingModule } from '@nestjs/testing';
import { UnitPondMqttController } from '../unit-pond-mqtt.controller';

describe('UnitPondMqttController', () => {
  let controller: UnitPondMqttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitPondMqttController],
    }).compile();

    controller = module.get<UnitPondMqttController>(UnitPondMqttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
