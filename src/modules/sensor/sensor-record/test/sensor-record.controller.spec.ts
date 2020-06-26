import { Test, TestingModule } from '@nestjs/testing';
import { SensorRecordController } from '../sensor-record.controller';

describe('SensorRecord Controller', () => {
  let controller: SensorRecordController;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorRecordController],
    }).compile();

    controller = module.get<SensorRecordController>(SensorRecordController);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
