import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Breed } from '../breeds/breed.entity';
import { SubBreed } from '../sub-breed/sub-breed.entity';

/**
 * Modelo que representa a las mascotas disponibles en la tienda CMPC-Dogs.
 */
@Table
export class Pet extends Model<Pet> {

    /**
     * Identificador único de la mascota.
     */
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    /**
     * Nombre de la mascota.
     */
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    age: number;

    @Column({
        type: DataType.ENUM,
        values: ['Male', 'Female'],
        allowNull: false,
    })
    sex: string;

    @ForeignKey(() => Breed)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    breedId: number;

    @BelongsTo(() => Breed)
    breed: Breed;

    @ForeignKey(() => SubBreed )
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    subBreedId: number;

    @BelongsTo(() => SubBreed)
    subBreed:SubBreed;
}