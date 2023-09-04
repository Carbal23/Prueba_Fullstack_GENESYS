import { Test, TestingModule } from '@nestjs/testing';
import { SubBreedController } from './sub-breeds.controller';

describe('SubBreedController', () => {
  let controller: SubBreedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubBreedController],
    }).compile();

    controller = module.get<SubBreedController>(SubBreedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
