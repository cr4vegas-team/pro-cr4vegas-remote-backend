import { Test, TestingModule } from '@nestjs/testing';
import { UnitStationPechinaService } from '../unit-station-pechina.service';

describe('UnitStationPechinaService', () => {
  let service: UnitStationPechinaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitStationPechinaService],
    }).compile();

    service = module.get<UnitStationPechinaService>(UnitStationPechinaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
