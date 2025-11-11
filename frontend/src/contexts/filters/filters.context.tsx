import { GetEducationFilters, GetEducationFiltersResponseData } from '@interfaces/education';
import { getEducationEventsFilters } from '@services/education-service/education-service';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FiltersContext } from './context';

interface FiltersFetcherProps {
  children: React.ReactNode;
  filters: GetEducationFilters;
}

export function FiltersFetcher({ children, filters }: FiltersFetcherProps) {
  const [fetchedFilters, setFetchedFilters] = useState<GetEducationFilters>([]);
  const [filtersData, setFiltersData] = useState<GetEducationFiltersResponseData>({});

  const fetchFilters = async (filters: GetEducationFilters) => {
    const res = await getEducationEventsFilters(filters);
    if (!res.error) {
      if (res.data) {
        setFiltersData(res.data);
      }
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
