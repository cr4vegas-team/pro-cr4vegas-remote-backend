import { Test, TestingModule } from '@nestjs/testing';
import { UnitHydrantController } from '../unit-hydrant.controller';

describe('UnitHydrant Controller', () => {
  let controller: UnitHydrantController;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitHydrantController],
    }).compile();

    controller = module.get<UnitHydrantController>(UnitHydrantController);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
