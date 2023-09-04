import { Breed } from './breed.entity';
import { BREEDS_REPOSITORY } from '../../core/constants';

export const breedsProviders = [{
    provide: BREEDS_REPOSITORY,
    useValue: Breed,
}];