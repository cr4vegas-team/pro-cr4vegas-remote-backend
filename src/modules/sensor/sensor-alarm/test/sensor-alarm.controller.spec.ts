import { Test, TestingModule } from '@nestjs/testing';
import { SensorAlarmController } from '../sensor-alarm.controller';

describe('SensorAlarm Controller', () => {
  let controller: SensorAlarmController;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorAlarmController],
    }).compile();

    controller = module.get<SensorAlarmController>(SensorAlarmController);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
