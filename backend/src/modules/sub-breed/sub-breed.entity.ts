import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { Breed } from '../breeds/breed.entity';

@Table
export class SubBreed extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Breed)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  breedId: number;

  @BelongsTo(() => Breed)
  breed: Breed;
}
