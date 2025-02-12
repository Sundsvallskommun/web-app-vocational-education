import { GetEducationFiltersResponseData } from '@interfaces/education';
import { createContext } from 'react';

interface FiltersContext {
  filters: GetEducationFiltersResponseData;
}

/** @ts-expect-error gets set on mount */
export const FiltersContext = createContext<FiltersContext>(null);
