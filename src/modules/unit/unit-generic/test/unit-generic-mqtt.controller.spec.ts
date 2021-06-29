import { Test, TestingModule } from '@nestjs/testing';
import { UnitGenericMqttController } from './unit-generic-mqtt.controller';

describe('UnitGenericMqttController', () => {
  let controller: UnitGenericMqttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitGenericMqttController],
    }).compile();

    controller = module.get<UnitGenericMqttController>(UnitGenericMqttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
