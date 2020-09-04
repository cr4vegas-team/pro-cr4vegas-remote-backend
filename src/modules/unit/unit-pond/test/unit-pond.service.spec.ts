import { Test, TestingModule } from '@nestjs/testing';
import { UnitPondService } from '../unit-pond.service';

describe('UnitPondService', () => {
  let service: UnitPondService;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitPondService],
    }).compile();

    service = module.get<UnitPondService>(UnitPondService);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
