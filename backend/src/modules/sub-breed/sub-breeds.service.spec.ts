import { Test, TestingModule } from '@nestjs/testing';
import { SubBreedService } from './sub-breeds.service';

describe('SubBreedService', () => {
  let service: SubBreedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubBreedService],
    }).compile();

    service = module.get<SubBreedService>(SubBreedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
