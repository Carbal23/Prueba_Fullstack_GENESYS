import { Pet } from './pet.entity';
import { PETS_REPOSITORY } from '../../core/constants';

export const petsProviders = [{
    provide: PETS_REPOSITORY,
    useValue: Pet,
}];