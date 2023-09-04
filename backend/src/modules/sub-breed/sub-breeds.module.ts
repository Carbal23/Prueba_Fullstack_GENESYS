import { Module } from '@nestjs/common';
import { SubBreedService } from './sub-breeds.service';
import { SubBreedController } from './sub-breeds.controller';
import { subBreedsProviders } from './sub-breeds.providers';

@Module({
  providers: [SubBreedService, ...subBreedsProviders],
  controllers: [SubBreedController]
})
export class SubBreedModule {}
