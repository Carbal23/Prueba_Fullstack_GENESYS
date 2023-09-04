import { useCallback, useEffect, useMemo, useReducer} from 'react';
import handleErrorMessage from 'src/context/utils/handleErrorMessage';
import { endpoints} from 'src/utils/axios';
import { PetsContext } from './petsContext';
import { IAddPet, IPet } from '../types';
import { useSnackbar } from 'src/components/snackbar';
import { useActiveLink } from 'src/routes/hooks';
import { httpClient } from 'src/utils/httpClient';
import reducer, { Types } from './petsReducer';
import { initialState } from '../initialState';

type Props = {
  children: React.ReactElement;
};

export const PetsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isPetsListViewActive = useActiveLink('/dashboard/pets/petslist');
  const { enqueueSnackbar } = useSnackbar();

  const loadingAction = useCallback(() => {
    dispatch({
      type: Types.LOADING_ACTION,
      payload: {
        loading: true,
      },
    });
  }, [dispatch]);

  const errorAction = useCallback(() => {
    dispatch({
      type: Types.ERROR_ACTION,
      payload: {
        error: true,
      },
    });
    setTimeout(() => {
      dispatch({
        type: Types.ERROR_ACTION,
        payload: {
          error: false,
        },
      });
    }, 4000);
  }, [dispatch]);

  useEffect(() => {
    // Si la vista UserListView no está activa, restablecer el valor de loading a true
    if (!isPetsListViewActive) {
      loadingAction();
    }
  }, [isPetsListViewActive, loadingAction]);

  const getPetsSuccess = useCallback(
    (pets: IPet[]) => {
      dispatch({
        type: Types.GET_PETS_SUCCESS,
        payload: {
          pets, 
        },
      });
    },
    [dispatch]);

  const getPetsAction = useCallback(async () => {
    loadingAction();
    try {
      const pets:IPet[] = await httpClient.get(endpoints.pets.list);
      getPetsSuccess(pets);
    } catch (error) {
      console.error('se a presentado un error', error);
      errorAction();
      handleErrorMessage(error);
    }
  }, [loadingAction, getPetsSuccess, errorAction]);

  const addPetSuccess = useCallback((pet: IPet) => {
    dispatch({
      type: Types.ADD_PET_SUCCESS,
      payload: {
        pet,
      },
    });
  }, [dispatch]);

  const addPetAction = useCallback(
    async (pet: IAddPet) => {
      try {
        const newPet:IPet = await httpClient.post(endpoints.pets.list, pet);
        console.log(newPet)
        enqueueSnackbar('Create success!');
        addPetSuccess(newPet);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessage(error);
      }
    },
    [addPetSuccess, enqueueSnackbar]);

  const deletePetSuccess = useCallback((id:number)=>{
    dispatch({
      type: Types.DELETE_PET_SUCCESS,
      payload: {
        id,
      },
    });
  },[dispatch])

  const deletePetAction = useCallback(async (id: number) => {
    try {
      await httpClient.delete(`${endpoints.pets.list}/${id}`);
      enqueueSnackbar('Delete user success!');
      deletePetSuccess(id);
    } catch (error) {
      console.error('error connection', error);
      handleErrorMessage(error);
    }
  }, [deletePetSuccess, enqueueSnackbar]);

  const multipleDeletePetsSuccess = useCallback((ids:number[])=>{
    dispatch({
      type: Types.MULTIPLE_DELETE_PETS_SUCCESS,
      payload: {
        ids,
      },
    });
  },[])
  
  const multipleDeletePetsAction = useCallback(async (ids: number[]) => {
    try {
      await httpClient.post(`${endpoints.pets.multiDelete}`,ids);
      enqueueSnackbar('Delete pets success!');
      multipleDeletePetsSuccess(ids);
    } catch (error) {
      console.error('error connection', error);
      handleErrorMessage(error);
    }
  }, [multipleDeletePetsSuccess, enqueueSnackbar]);

  const memoizedValue = useMemo(
    () => ({
      pets: state.pets,
      loading: state.loading,
      error: state.error,
      //
      getPetsAction,
      addPetAction,
      deletePetAction,
      multipleDeletePetsAction,
    }),
    [getPetsAction, addPetAction, deletePetAction, multipleDeletePetsAction, state.pets, state.loading, state.error]
  );

  return <PetsContext.Provider value={memoizedValue}>{children}</PetsContext.Provider>;
};
