import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { PetDto } from './dto/pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async findAll() {
    const pets = await this.petsService.findAll();
    const petsResponse = pets.map((pet) => {
      return {
        id: pet.id,
        name: pet.name,
        age: pet.age,
        sex: pet.sex,
        breed: pet.breed,
        subBreed: pet.subBreed,
        createdAt: pet.createdAt,
        updatedAt: pet.updatedAt,
      };
    });

    return petsResponse;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pet> {
    const pet = await this.petsService.findOne(id);

    if (!pet) {
      throw new NotFoundException("This Pet doesn't exist");
    }

    return pet;
  }

  @Post()
  async create(@Body() pet: PetDto): Promise<Pet> {
    try {
      return await this.petsService.create(pet);
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeForeignKeyConstraintError') {
        throw new NotFoundException(
          'No hay registro de razas en base de datos. Crea razas antes de agregar mascotas.',
        );
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.petsService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException("This Pet doesn't exist");
    }

    return 'Successfully deleted';
  }

  @Post('delete-multiple')
  async deleteMultiple(@Body() ids: number[]): Promise<string> {
    if (!ids || ids.length === 0) {
      return 'No se proporcionaron IDs válidos.';
    }

    const deletedPets = await this.petsService.deleteMultiple(ids);

    return `${deletedPets} pets eliminados`;
  }
}
