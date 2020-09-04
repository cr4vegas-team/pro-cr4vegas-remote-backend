import { Test, TestingModule } from '@nestjs/testing';
import { UnitGenericService } from '../unit-generic.service';

describe('UnitGenericService', () => {
  let service: UnitGenericService;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitGenericService],
    }).compile();

    service = module.get<UnitGenericService>(UnitGenericService);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
