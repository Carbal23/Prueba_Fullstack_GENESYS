import { useContext } from 'react';
import { IBreedContext } from '../types';
import { BreedContext } from '../context';
//

// ----------------------------------------------------------------------

export const useBreedContext = () => {
  const context:IBreedContext = useContext(BreedContext);

  if (!context) throw new Error('usePetsContext context must be use inside PetsProvider');

  return context;
};
