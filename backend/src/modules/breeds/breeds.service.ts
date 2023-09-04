import { Injectable, Inject } from '@nestjs/common';
import { Breed } from './breed.entity';
import { SubBreed } from '../sub-breed/sub-breed.entity';
import { BreedDto } from './dto/breed.dto';
import { BREEDS_REPOSITORY, SUBBREEDS_REPOSITORY } from '../../core/constants';

@Injectable()
export class BreedsService {
  constructor(
    @Inject(BREEDS_REPOSITORY) private readonly BreedRepository: typeof Breed,
    @Inject(SUBBREEDS_REPOSITORY)
    private readonly SubBreedRepository: typeof SubBreed,
  ) {}

  async create(breed: BreedDto): Promise<Breed> {
    const breedData = { ...breed };
    const subBreeds = breedData.subBreeds;
    delete breedData.subBreeds;

    const newBreed = await this.BreedRepository.create<Breed>({ ...breedData });
    const breedId = newBreed;

    if (subBreeds && subBreeds.length > 0) {
      const subBreedData = subBreeds.map((subBreedDto) => ({
        name: subBreedDto.name,
        breedId: breedId.id,
      }));
      const createdSubBreeds =
        await this.SubBreedRepository.bulkCreate(subBreedData);
      await newBreed.$set('subBreeds', createdSubBreeds);

      const subBreedsAssociated = await newBreed.$get('subBreeds');

      newBreed.setDataValue('subBreeds', subBreedsAssociated);
    }

    return newBreed;
  }

  async findAll(): Promise<Breed[]> {
    return await this.BreedRepository.findAll<Breed>({
      include: [SubBreed],
      order: [['updatedAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Breed> {
    return await this.BreedRepository.findOne({
      where: { id },
      include: [SubBreed],
    });
  }

  async delete(id: number) {
    return await this.BreedRepository.destroy({ where: { id } });
  }

  async deleteMultiple(ids: number[]): Promise<number> {
    return this.BreedRepository.destroy({
      where: { id: ids },
    });
  }
}
