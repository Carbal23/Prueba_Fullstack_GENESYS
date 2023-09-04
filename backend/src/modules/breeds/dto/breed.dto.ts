import { IsNotEmpty } from 'class-validator';
import { SubBreedDto } from 'src/modules/sub-breed/dto/sub-breed.dto';

export class BreedDto {
    @IsNotEmpty()
    readonly name: string;

    readonly subBreeds: SubBreedDto[];

}