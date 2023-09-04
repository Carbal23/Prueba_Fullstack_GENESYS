import { useCallback, useMemo, useReducer} from 'react';
import { endpoints} from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { httpClient } from 'src/utils/httpClient';
import handleErrorMessage from 'src/context/utils/handleErrorMessage';
import reducer, { Types } from './breedReducer';
import { initialState } from '../initialState';
import { BreedContext } from './breedContext';
import { IAddBreedPet,  IGetBreedPet } from '../types';


type Props = {
  children: React.ReactElement;
};

export const BreedProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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

  const getBreedsSuccess = useCallback(
    (breeds: IGetBreedPet[]) => {
      dispatch({
        type: Types.GET_BREEDS_SUCCESS,
        payload: {
          breeds, 
        },
      });
    },
    [dispatch]
  );

  const getBreedsAction = useCallback(async () => {
    loadingAction();
    try {
      const breeds:IGetBreedPet[] = await httpClient.get(endpoints.breeds.list);
      getBreedsSuccess(breeds);
    } catch (error) {
      console.error('se a presentado un error', error);
      errorAction();
      handleErrorMessage(error);
    }
  }, [loadingAction, getBreedsSuccess, errorAction]);

  const addBreedSuccess = useCallback((breed: IGetBreedPet) => {
    dispatch({
      type: Types.ADD_BREED_SUCCESS,
      payload: {
        breed,
      },
    });
  }, []);

  const addBreedAction = useCallback(
    async (breed: IAddBreedPet) => {
      try {
        const newBreed:IGetBreedPet = await httpClient.post(endpoints.breeds.list, breed);
        console.log(newBreed)
        enqueueSnackbar('Create success!');
        addBreedSuccess(newBreed);
      } catch (error) {
        console.error('error connection', error);
        handleErrorMessage(error);
      }
    },
    [addBreedSuccess, enqueueSnackbar]);

  const deleteBreedSuccess = useCallback((id:number)=>{
    dispatch({
      type: Types.DELETE_BREED_SUCCESS,
      payload: {
        id,
      },
    });
  },[])
  const deleteBreedAction = useCallback(async (id: number) => {
    try {
      await httpClient.delete(`${endpoints.breeds.list}/${id}`);
      enqueueSnackbar('Delete user success!');
      deleteBreedSuccess(id);
    } catch (error) {
      console.error('error connection', error);
      handleErrorMessage(error);
    }
  }, [deleteBreedSuccess, enqueueSnackbar]);

  const multipleDeleteBreedsSuccess = useCallback((ids:number[])=>{
    dispatch({
      type: Types.MULTIPLE_DELETE_BREEDS_SUCCESS,
      payload: {
        ids,
      },
    });
  },[])

  const multipleDeleteBreedsAction = useCallback(async (ids: number[]) => {
    try {
      await httpClient.post(`${endpoints.pets.multiDelete}`,ids);
      enqueueSnackbar('Delete pets success!');
      multipleDeleteBreedsSuccess(ids);
    } catch (error) {
      console.error('error connection', error);
      handleErrorMessage(error);
    }
  }, [multipleDeleteBreedsSuccess,enqueueSnackbar]);

  const memoizedValue = useMemo(
    () => ({
      breeds: state.breeds,
      loading: state.loading,
      error: state.error,
      //
      getBreedsAction,
      addBreedAction,
      deleteBreedAction,
      multipleDeleteBreedsAction,
    }),
    [getBreedsAction, addBreedAction, deleteBreedAction, multipleDeleteBreedsAction, state.breeds, state.loading, state.error]
  );

  return <BreedContext.Provider value={memoizedValue}>{children}</BreedContext.Provider>;
};
