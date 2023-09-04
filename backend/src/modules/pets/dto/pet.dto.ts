import { IsNotEmpty, MinLength, IsEnum } from 'class-validator';

enum Sex {
    MALE = 'Male',
    FEMALE = 'Female',
}

export class PetDto {
    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsNotEmpty()
    readonly age: number;

    @IsNotEmpty()
    @IsEnum(Sex, {
        message: 'sex must be either Male or Female',
    })
    readonly sex: Sex;

    @IsNotEmpty()
    readonly breedId: number;

    readonly subBreedId?: number;
}