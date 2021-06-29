import { Test, TestingModule } from '@nestjs/testing';
import { UnitHydrantMqttController } from '../unit-hydrant-mqtt.controller';

describe('UnitHydrantMqttController', () => {
  let controller: UnitHydrantMqttController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitHydrantMqttController],
    }).compile();

    controller = module.get<UnitHydrantMqttController>(UnitHydrantMqttController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
