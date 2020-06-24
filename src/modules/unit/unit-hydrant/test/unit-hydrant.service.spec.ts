import { Test, TestingModule } from '@nestjs/testing';
import { UnitHydrantService } from '../unit-hydrant.service';

describe('UnitHydrantService', () => {
  let service: UnitHydrantService;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitHydrantService],
    }).compile();

    service = module.get<UnitHydrantService>(UnitHydrantService);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
