import { ActionMapType, IBreedState, IGetBreedPet} from '../types';

export enum Types {
  LOADING_ACTION = 'LOADING_ACTION',
  ERROR_ACTION = 'ERROR_ACTION',
  GET_BREEDS_SUCCESS = 'GET_BREEDS_SUCCESS',
  ADD_BREED_SUCCESS = 'ADD_BREED_SUCCESS',
  DELETE_BREED_SUCCESS = 'DELETE_BREED_SUCCESS',
  MULTIPLE_DELETE_BREEDS_SUCCESS = 'DELETE_BREEDS_SUCCESS',
}

type Payload = {
  [Types.LOADING_ACTION]: {
    loading: boolean;
  };
  [Types.ERROR_ACTION]: {
    error: boolean;
  };
  [Types.GET_BREEDS_SUCCESS]: {
    breeds: IGetBreedPet[];
  };
  [Types.ADD_BREED_SUCCESS]: {
    breed: IGetBreedPet;
  };
  [Types.DELETE_BREED_SUCCESS]: {
    id: number;
  };
  [Types.MULTIPLE_DELETE_BREEDS_SUCCESS]: {
    ids: number[];
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const reducer = (state: IBreedState, action: ActionsType) => {
  if (action.type === Types.LOADING_ACTION) {
    return {
      ...state,
      loading: action.payload.loading,
      error: false,
    };
  }
  if (action.type === Types.ERROR_ACTION) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  }
  if (action.type === Types.GET_BREEDS_SUCCESS) {
    return {
      ...state,
      loading: false,
      breeds: action.payload.breeds,
      error: false,
    };
  }
  if (action.type === Types.ADD_BREED_SUCCESS) {
    return {
      ...state,
      breeds: [action.payload.breed, ...state.breeds ],
    };
  }
  if (action.type === Types.DELETE_BREED_SUCCESS) {
    return {
      ...state,
      breeds: state.breeds.filter((breed) => breed.id !== action.payload.id),
    };
  }
  if (action.type === Types.MULTIPLE_DELETE_BREEDS_SUCCESS) {
    return {
      ...state,
      breeds: state.breeds.filter((breed) => !action.payload.ids.includes(breed.id)),
    };
  }
  return state;
};

export default reducer;
