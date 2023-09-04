import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { petsProviders } from './pets.providers';
import { breedsProviders } from '../breeds/breeds.providers';
import { subBreedsProviders } from '../sub-breed/sub-breeds.providers';

@Module({
  providers: [
    PetsService,
    ...petsProviders,
    ...breedsProviders,
    ...subBreedsProviders,
  ],
  controllers: [PetsController],
})
export class PetsModule {}
