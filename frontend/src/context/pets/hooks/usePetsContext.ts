import { useContext } from 'react';
import { IPetsContext } from '../types';
import { PetsContext } from '../context';
//

// ----------------------------------------------------------------------

export const usePetsContext = () => {
  const context:IPetsContext = useContext(PetsContext);

  if (!context) throw new Error('usePetsContext context must be use inside PetsProvider');

  return context;
};
