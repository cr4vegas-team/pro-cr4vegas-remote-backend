import { Test, TestingModule } from '@nestjs/testing';
import { UnitPondGateway } from '../unit-pond.gateway';

describe('UnitPondGateway', () => {
  let gateway: UnitPondGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitPondGateway],
    }).compile();

    gateway = module.get<UnitPondGateway>(UnitPondGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
