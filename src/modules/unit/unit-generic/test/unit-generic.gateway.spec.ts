import { Test, TestingModule } from '@nestjs/testing';
import { UnitGenericGateway } from '../unit-generic.gateway';

describe('UnitGenericGateway', () => {
  let gateway: UnitGenericGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitGenericGateway],
    }).compile();

    gateway = module.get<UnitGenericGateway>(UnitGenericGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
