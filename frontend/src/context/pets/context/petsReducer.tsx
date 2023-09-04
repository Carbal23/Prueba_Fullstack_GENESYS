import { ActionMapType, IPet, IPetsState} from '../types';

export enum Types {
  LOADING_ACTION = 'LOADING_ACTION',
  ERROR_ACTION = 'ERROR_ACTION',
  GET_PETS_SUCCESS = 'GET_PETS_SUCCESS',
  ADD_PET_SUCCESS = 'ADD_PET_SUCCESS',
  DELETE_PET_SUCCESS = 'DELETE_PET_SUCCESS',
  MULTIPLE_DELETE_PETS_SUCCESS = 'DELETE_PETS_SUCCESS',
}

type Payload = {
  [Types.LOADING_ACTION]: {
    loading: boolean;
  };
  [Types.ERROR_ACTION]: {
    error: boolean;
  };
  [Types.GET_PETS_SUCCESS]: {
    pets: IPet[];
  };
  [Types.ADD_PET_SUCCESS]: {
    pet: IPet;
  };
  [Types.DELETE_PET_SUCCESS]: {
    id: number;
  };
  [Types.MULTIPLE_DELETE_PETS_SUCCESS]: {
    ids: number[];
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const reducer = (state: IPetsState, action: ActionsType) => {
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
  if (action.type === Types.GET_PETS_SUCCESS) {
    return {
      ...state,
      loading: false,
      pets: action.payload.pets,
      error: false,
    };
  }
  if (action.type === Types.ADD_PET_SUCCESS) {
    return {
      ...state,
      pets: [action.payload.pet, ...state.pets ],
    };
  }
  if (action.type === Types.DELETE_PET_SUCCESS) {
    return {
      ...state,
      pets: state.pets.filter((pet) => pet.id !== action.payload.id),
    };
  }
  if (action.type === Types.MULTIPLE_DELETE_PETS_SUCCESS) {
    return {
      ...state,
      pets: state.pets.filter((pet) => !action.payload.ids.includes(pet.id)),
    };
  }
  return state;
};

export default reducer;
