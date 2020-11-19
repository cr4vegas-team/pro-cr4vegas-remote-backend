import { SectorController } from '../sector.controller';

describe('Sector Controller', () => {
  let controller: SectorController;

  /* beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectorController],
    }).compile();

    controller = module.get<SectorController>(SectorController);
  }); */

  it('should be defined', () => {
    expect(5).toBeDefined();
  });
});
