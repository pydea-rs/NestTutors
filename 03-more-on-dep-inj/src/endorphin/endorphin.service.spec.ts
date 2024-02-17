import { Test, TestingModule } from '@nestjs/testing';
import { EndorphinService } from './endorphin.service';

describe('EndorphinService', () => {
  let service: EndorphinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EndorphinService],
    }).compile();

    service = module.get<EndorphinService>(EndorphinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
