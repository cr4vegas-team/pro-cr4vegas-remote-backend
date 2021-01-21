import { Test, TestingModule } from '@nestjs/testing';
import { UnitStationPechinaController } from '../unit-station-pechina.controller';

describe('UnitStationPechinaController', () => {
  let controller: UnitStationPechinaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitStationPechinaController],
    }).compile();

    controller = module.get<UnitStationPechinaController>(UnitStationPechinaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
