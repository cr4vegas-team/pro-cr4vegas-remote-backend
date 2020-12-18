import { Test, TestingModule } from '@nestjs/testing';
import { UnitHydrantGateway } from '../unit-hydrant.gateway';

describe('UnitHydrantGateway', () => {
  let gateway: UnitHydrantGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitHydrantGateway],
    }).compile();

    gateway = module.get<UnitHydrantGateway>(UnitHydrantGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
