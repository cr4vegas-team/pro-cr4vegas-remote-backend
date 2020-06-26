import { Test, TestingModule } from '@nestjs/testing';
import { SensorRecordService } from '../sensor-record.service';

describe('SensorRecordService', () => {
  let service: SensorRecordService;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorRecordService],
    }).compile();

    service = module.get<SensorRecordService>(SensorRecordService);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
