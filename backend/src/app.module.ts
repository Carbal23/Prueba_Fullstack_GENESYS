import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PetsModule } from './modules/pets/pets.module';
import { BreedsModule } from './modules/breeds/breeds.module';
import { SubBreedModule } from './modules/sub-breed/sub-breeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    PetsModule,
    BreedsModule,
    SubBreedModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
