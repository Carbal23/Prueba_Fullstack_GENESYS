import { Injectable, Inject } from '@nestjs/common';
import { Pet } from './pet.entity';
import { PetDto } from './dto/pet.dto';
import { PETS_REPOSITORY } from '../../core/constants';

@Injectable()
export class PetsService {
  constructor(
    @Inject(PETS_REPOSITORY) private readonly PetRepository: typeof Pet,
  ) {}

  async create(pet: PetDto): Promise<Pet> {
    const newPet = await this.PetRepository.create<Pet>(pet, {
      include: [{ all: true }],
    });

    return await this.findOne(newPet.id)
      
  }

  async findAll(): Promise<Pet[]> {
    return await this.PetRepository.findAll<Pet>({
      include: [{ all: true }],
      order: [['updatedAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Pet> {
    return await this.PetRepository.findOne({
      where: { id },
      include: [{ all: true }],
    });
  }

  async delete(id: number) {
    return await this.PetRepository.destroy({ where: { id } });
  }

  async deleteMultiple(ids: number[]): Promise<number> {
    const deletedPets = await this.PetRepository.destroy({
      where: {
        id: ids,
      },
    });

    return deletedPets;
  }
}
