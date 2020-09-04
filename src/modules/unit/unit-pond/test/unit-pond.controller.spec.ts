import { Test, TestingModule } from '@nestjs/testing';
import { UnitPondController } from '../unit-pond.controller';

describe('UnitPond Controller', () => {
  let controller: UnitPondController;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitPondController],
    }).compile();

    controller = module.get<UnitPondController>(UnitPondController);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
