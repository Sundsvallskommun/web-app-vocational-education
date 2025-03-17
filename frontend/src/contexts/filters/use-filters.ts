import { useContext } from 'react';
import { FiltersContext } from './context';

export function useFiltersContext() {
  return useContext(FiltersContext);
}
