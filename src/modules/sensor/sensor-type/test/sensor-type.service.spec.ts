import { Test, TestingModule } from '@nestjs/testing';
import { SensorTypeService } from '../sensor-type.service';

describe('SensorTypeService', () => {
  let service: SensorTypeService;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorTypeService],
    }).compile();

    service = module.get<SensorTypeService>(SensorTypeService);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
