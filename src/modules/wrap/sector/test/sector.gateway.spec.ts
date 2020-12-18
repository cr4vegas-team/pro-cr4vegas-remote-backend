import { Test, TestingModule } from '@nestjs/testing';
import { SectorGateway } from '../sector.gateway';

describe('SectorGateway', () => {
  let gateway: SectorGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectorGateway],
    }).compile();

    gateway = module.get<SectorGateway>(SectorGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
