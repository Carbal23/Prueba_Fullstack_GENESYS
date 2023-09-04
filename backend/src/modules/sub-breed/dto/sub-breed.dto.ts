import { IsNotEmpty } from 'class-validator';

export class SubBreedDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly breedId: number;
}