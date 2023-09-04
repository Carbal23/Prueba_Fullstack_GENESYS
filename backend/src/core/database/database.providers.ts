import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../constants';
import { databaseConfig } from './database.config';
import { Pet } from 'src/modules/pets/pet.entity';
import { Breed } from 'src/modules/breeds/breed.entity';
import { SubBreed } from 'src/modules/sub-breed/sub-breed.entity';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        const sequelize = new Sequelize(databaseConfig);
        sequelize.addModels([Pet, Breed, SubBreed]);
        await sequelize.sync();
        return sequelize;
    },
}];