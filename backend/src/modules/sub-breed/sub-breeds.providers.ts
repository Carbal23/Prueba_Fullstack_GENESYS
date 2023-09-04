import { SubBreed } from './sub-breed.entity';
import { SUBBREEDS_REPOSITORY } from '../../core/constants';

export const subBreedsProviders = [{
    provide: SUBBREEDS_REPOSITORY,
    useValue: SubBreed,
}];