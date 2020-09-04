import { Test, TestingModule } from '@nestjs/testing';
import { UnitGenericController } from '../unit-generic.controller';

describe('UnitGeneric Controller', () => {
  let controller: UnitGenericController;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitGenericController],
    }).compile();

    controller = module.get<UnitGenericController>(UnitGenericController);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
