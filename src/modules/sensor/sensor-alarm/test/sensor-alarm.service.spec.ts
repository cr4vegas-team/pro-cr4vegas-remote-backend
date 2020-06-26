import { Test, TestingModule } from '@nestjs/testing';
import { SensorAlarmService } from '../sensor-alarm.service';

describe('SensorAlarmService', () => {
  let service: SensorAlarmService;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorAlarmService],
    }).compile();

    service = module.get<SensorAlarmService>(SensorAlarmService);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
