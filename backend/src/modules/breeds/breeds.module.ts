import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { breedsProviders } from './breeds.providers';
import { subBreedsProviders } from '../sub-breed/sub-breeds.providers';

@Module({
  providers: [BreedsService, ...breedsProviders, ...subBreedsProviders],
  controllers: [BreedsController],
})
export class BreedsModule {}
