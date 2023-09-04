export enum Sex {
  male = "male",
  female = "female"
}

export interface ISubBreedPet {
  id: number,
  name: string,
  breedId: number, 
}

export interface IAddSubBreedPet {
  name: string;
}

export interface IBreedPet {
  id: number,
  name: string,
}

export interface IAddBreedPet {
  name: string,
  subBreeds?: IAddSubBreedPet[],
}

export interface IGetBreedPet {
  id: number,
  name: string,
  subBreeds: ISubBreedPet[],
}

export interface IPet {
  id:number
  name: string;
  age: number;
  sex: Sex;
  breed: IBreedPet;
  subBreed?: ISubBreedPet;
}

export interface IAddPet {
  name: string;
  age: number;
  sex: Sex;
  breedId: number;
  subBreedId?: number;
}

export interface IBreedContext {
  breeds: IGetBreedPet[];
  loading: boolean;
  error: boolean;
  getBreedsAction: () => Promise<void>;
  addBreedAction: (breed: IAddBreedPet) => Promise<void>;
  deleteBreedAction: (id: number) => Promise<void>;
  multipleDeleteBreedsAction: (ids: number[]) => Promise<void>;
}

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface IBreedState {
  breeds: IGetBreedPet[],
  loading: boolean;
  error: boolean;
}
