import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { SubBreed } from '../sub-breed/sub-breed.entity';

@Table
export class Breed extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => SubBreed)
  subBreeds: SubBreed[];
}
