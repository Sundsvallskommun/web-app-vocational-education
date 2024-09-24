import { GetEducationFilters, GetEducationFiltersResponseData } from '@interfaces/education';
import { getEducationEventsFilters } from '@services/education-service/education-service';
import React, { useState } from 'react';
import { createContext, useContext, useEffect } from 'react';
import _ from 'lodash';

interface FiltersContext {
  filters: GetEducationFiltersResponseData;
}

const FiltersContext = createContext<FiltersContext>(null);

interface FiltersFetcherProps {
  children: React.ReactNode;
  filters: GetEducationFilters;
}

export function FiltersFetcher({ children, filters }: FiltersFetcherProps) {
  const [fetchedFilters, setFetchedFilters] = useState([]);
  const [filtersData, setFiltersData] = useState<GetEducationFiltersResponseData>({});

  const fetchFilters = async (filters) => {
    const res = await getEducationEventsFilters(filters);
    if (!res.error) {
      setFiltersData(res.data);
      setFetchedFilters(filters);
    }
  };

  useEffect(() => {
    if (!_.isEqual(fetchedFilters, filters)) {
      fetchFilters(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FiltersContext.Provider value={{ filters: filtersData }}>{children}</FiltersContext.Provider>;
}

export function useFiltersContext() {
  return useContext(FiltersContext);
}
