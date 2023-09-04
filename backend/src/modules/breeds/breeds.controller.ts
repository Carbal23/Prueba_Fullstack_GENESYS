import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    NotFoundException,
  } from '@nestjs/common';
  import { BreedsService } from './breeds.service';
  import { Breed } from './breed.entity';
  import { BreedDto } from './dto/breed.dto';

  
  @Controller('breeds')
  export class BreedsController {
    constructor(private readonly breedsService: BreedsService) {}
  
    @Get()
    async findAll() {
      return await this.breedsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Breed> {
      const breed = await this.breedsService.findOne(id);
  
      if (!breed) {
        throw new NotFoundException("This breed doesn't exist");
      }
  
      return breed;
    }
  
    @Post()
    async create(@Body() breed: BreedDto): Promise<Breed> {
        return await this.breedsService.create(breed);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: number) {
      const deleted = await this.breedsService.delete(id);
  
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
    
      const deletedBreeds = await this.breedsService.deleteMultiple(ids);
    
      return `${deletedBreeds} pets eliminados`;
    }
  }
