import { Test, TestingModule } from '@nestjs/testing';
import { SetGateway } from '../set.gateway';

describe('SetGateway', () => {
  let gateway: SetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetGateway],
    }).compile();

    gateway = module.get<SetGateway>(SetGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
