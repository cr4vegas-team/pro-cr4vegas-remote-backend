import { Test } from '@nestjs/testing';
import { UnitController } from '../unit.controller';
import { UnitService } from '../unit.service';

const unitRepository = {

  activate: jest.fn().mockImplementation((id: number) => {
    if(id === 1) return true;
    return false;
  }),

  delete: jest.fn().mockImplementation((id: number) => {
    if(id === 1) return true;
    return false;
  }),
}

describe('Unit Controller', () => {

  let unitController: UnitController;
  let unitService: UnitService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UnitController],
      providers: [
        {
          provide: UnitService,
          useValue: unitRepository,
        },
      ],
    }).compile();

    unitController = moduleRef.get<UnitController>(UnitController);
    unitService = moduleRef.get<UnitService>(UnitService);
  });

  describe('activate & delete', () => {
    it('Show return true or false', () => {
      expect(unitController.activate(1)).toBe(true);
      expect(unitController.activate(2)).toBe(false);
      expect(unitController.delete(1)).toBe(true);
      expect(unitController.delete(2)).toBe(false);
    })
  })

});
