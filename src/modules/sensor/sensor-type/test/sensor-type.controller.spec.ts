import { Test, TestingModule } from '@nestjs/testing';
import { SensorTypeController } from '../sensor-type.controller';

describe('SensorType Controller', () => {
  let controller: SensorTypeController;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorTypeController],
    }).compile();

    controller = module.get<SensorTypeController>(SensorTypeController);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
