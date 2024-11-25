import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import Button from '@components/button/button.component';
import Drop from '@components/drop/drop.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import EducationsCards from '@components/search/educations-cards/educations-cards.component';
import EducationsFilters from '@components/search/educations-filters.component';
import EducationsTable from '@components/search/educations-table/educations-table.component';
import Search from '@components/search/search.component';
import { useAppContext } from '@contexts/app.context';
import { PageProps } from '@interfaces/admin-data';
import { Course, EducationFilterOptions } from '@interfaces/education';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import {
  defaultEducationFilterOptions,
  emptyEducationFilterOptions,
  getEducationEvents,
  typeReferenceEducationFilterOptions,
} from '@services/education-service/education-service';
import { cx, Link, omit, Spinner } from '@sk-web-gui/react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getStandardPageProps } from '@utils/page-types';
import { addToQueryString, createObjectFromQueryString, deserializeURL, serializeURL } from '@utils/url';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import Sticky from 'react-sticky-el';

export async function getServerSideProps(context) {
  return getStandardPageProps(context);
}

export const Sok: React.FC = ({ layoutData, pageData }: PageProps) => {
  const { searchCompareList, setSearchCompareList, searchCurrent, setSearchCurrent } = useAppContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeListing, setActiveListing] = useState(1);

  const [searchQuery, setSearchQuery] = useState<string>(defaultEducationFilterOptions.q);
  const [searchFilters, setSearchFilters] = useState<EducationFilterOptions>(
    omit(defaultEducationFilterOptions, ['q'])
  );

  // pagination
  const [pageSize, setPageSize] = useState<number>(defaultEducationFilterOptions.size);
  const [page, setPage] = useState<number>(defaultEducationFilterOptions.page);

  const [isFiltersTouched, setIsFiltersTouched] = useState(false);

  const {
    data: searchResults,
    isPending: isPending,
    isFetching,
  } = useQuery({
    queryKey: ['searchResults', JSON.stringify(searchFilters)],
    queryFn: async () => {
      const res = await getEducationEvents({ ...searchFilters });
      if (!res.error) {
        return res;
      } else {
        return null;
      }
    },
    enabled: !!searchFilters.q, // only run query if query is not empty
    refetchOnWindowFocus: false, // default: true
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
    placeholderData: keepPreviousData,
  });

  const updateParams = (values: string) => {
    router.replace(
      {
        pathname: router.pathname,
        query: values,
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleSetPage = (page) => {
    if (typeof page === 'function') {
      return handleSetPage(page(page));
    }
    setPage(page);
    updateParams(addToQueryString({ page: page as number }));
  };

  const handleSetPageSize = useCallback(
    (size) => {
      if (typeof size === 'function') {
        return handleSetPageSize(size(pageSize));
      }
      setSearchCurrent(
        serializeURL({
          ...searchFilters,
          size: size,
          id: searchResults?.courses[searchResults.courses.length - 1].id || '',
        })
      );
      setPageSize(size);
      updateParams(addToQueryString({ size: size, page: page as number }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchFilters, searchResults, pageSize]
  );

  const handleSetActiveListing = (listType: number) => {
    setPageSize(defaultEducationFilterOptions.size);
    setPage(defaultEducationFilterOptions.page);
    updateParams(
      addToQueryString({ page: defaultEducationFilterOptions.page, size: defaultEducationFilterOptions.size })
    );
    setActiveListing(listType);
  };

  const handleCheckboxClick = (edu: Course) => (e: React.BaseSyntheticEvent) => {
    setSearchCompareList((items) => {
      if (e.target.checked) {
        return items.concat(edu);
      } else {
        return items.filter((x) => x.id !== edu.id);
      }
    });
  };

  const handleOnSubmitCallback = (filterData: EducationFilterOptions) => {
    const filters = createObjectFromQueryString(window.location.search, {
      objectReference: typeReferenceEducationFilterOptions,
      objectReferenceAsBase: true,
    });
    if (JSON.stringify(filters) !== JSON.stringify(filterData)) {
      updateParams(serializeURL({ ...filterData }));
    }
  };

  const handleOnResetSearchCompareList = () => {
    setSearchCompareList([]);
  };

  const handleOnClickResult = useCallback(
    (id?: number) => {
      if (id) {
        setSearchCurrent(
          serializeURL({
            ...searchFilters,
            id: id,
          })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchFilters]
  );

  useEffect(() => {
    const filters = createObjectFromQueryString(searchCurrent || window.location.search, {
      objectReference: typeReferenceEducationFilterOptions,
      objectReferenceOnly: true,
    });

    const updatedQuery = filters.q || '';
    const isQueryChanged = updatedQuery !== searchQuery;

    const filtersWithBaseDefaults = {
      ...emptyEducationFilterOptions,
      ...((Object.keys(filters).length === 1 && updatedQuery) || isQueryChanged ?
        { ...defaultEducationFilterOptions, q: updatedQuery }
      : {
          page: page,
          size: pageSize,
          ...filters,
        }),
    };

    const updatedFilters = filtersWithBaseDefaults;
    const isFiltersChanged = JSON.stringify(updatedFilters) !== JSON.stringify(searchFilters);

    const isChanged = isQueryChanged || isFiltersChanged;

    if (isQueryChanged) {
      setSearchQuery(updatedQuery);
      setPage(defaultEducationFilterOptions.page);
      setPageSize(defaultEducationFilterOptions.size);
    }

    if (isFiltersChanged) {
      setSearchFilters(updatedFilters);
    }

    if (isChanged) {
      setIsFiltersTouched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (searchCurrent && !isPending) {
      const currentSearchFilters = deserializeURL(searchCurrent);

      const currentElem = document.querySelector(`[data-id="${currentSearchFilters.id}"]`);
      if (currentElem) {
        (currentElem as HTMLElement).focus();
        setSearchCurrent(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

  return (
    <DefaultLayout
      title={`Yrkesutbildning - ${searchQuery ? 'Sökresultat: ' + searchQuery : 'Sök'}`}
      layoutData={layoutData}
    >
      <ContentBlock>
        <BigDropHeader
          imageSrc={pageData?.imgSrc}
          imageAlt={pageData?.imgAlt}
          imageDivClassName={cx(
            pageData?.showImgInMobile ? 'block' : 'hidden',
            pageData?.showImgInDesktop ? 'desktop:block' : 'desktop:hidden'
          )}
          breadcrumbs={<Breadcrumbs lastItemTitle={searchQuery ? 'Sökresultat: ' + searchQuery : 'Sök'} />}
        >
          <h1>{pageData?.title}</h1>
          {pageData.description ?
            <p className="ingress">{pageData.description}</p>
          : <></>}

          <Search className="phone:mt-[25px] mt-2xl" keepParams />
          {isFiltersTouched && (
            <>
              <h2 className="mt-md desktop:mt-[7.25rem] text-large desktop:text-[2.6rem] leading-[3.6rem] mb-0">
                {isFetching ?
                  <>
                    Sökresultat laddar för <strong>{searchQuery}</strong>
                  </>
                : <>
                    Din sökning<strong>{` ${searchQuery} `}</strong>gav{' '}
                    <strong>
                      {!searchResults?._meta || searchResults?._meta?.totalRecords == 0 ?
                        <span>Inga träffar</span>
                      : <>
                          <span>{searchResults?._meta?.totalRecords}</span>{' '}
                          {(
                            (searchResults?._meta?.totalRecords && searchResults?._meta?.totalRecords > 1) ||
                            searchResults?._meta?.totalRecords == 0
                          ) ?
                            'träffar'
                          : 'träff'}
                        </>
                      }
                    </strong>
                  </>
                }
              </h2>
            </>
          )}
        </BigDropHeader>

        <div className="mt-lg">
          <EducationsFilters
            activeListing={activeListing}
            setActiveListing={handleSetActiveListing}
            formData={searchFilters}
            submitCallback={handleOnSubmitCallback}
            searchQuery={searchQuery}
          />

          {isPending && isFetching && (
            <div className="mt-md w-full flex justify-center">
              <Spinner aria-label="Laddar sökresultat" />
            </div>
          )}
          {!isPending && searchResults?.courses?.length && searchResults?.courses?.length > 0 ?
            <div className="mt-md desktop:mt-[6.6rem] flex flex-col gap-lg desktop:flex-row">
              <div className="w-full flex flex-col gap-lg desktop:w-[830px]">
                {activeListing === 1 ?
                  <EducationsCards
                    educations={searchResults?.courses}
                    handleCheckboxClick={handleCheckboxClick}
                    _meta={searchResults?._meta}
                    setPageSize={handleSetPageSize}
                    handleOnClickResult={handleOnClickResult}
                  />
                : <EducationsTable
                    educations={searchResults?.courses}
                    handleCheckboxClick={handleCheckboxClick}
                    _meta={searchResults?._meta}
                    setPage={handleSetPage}
                    handleOnClickResult={handleOnClickResult}
                  />
                }
                {isFetching && (
                  <div className="mt-md w-full flex justify-center">
                    <Spinner aria-label="Laddar sökresultat" />
                  </div>
                )}
              </div>
              <div className="max-w-[300px] compareStickyParent">
                  
                <Sticky
                  boundaryElement=".compareStickyParent"
                  wrapperClassName="fixed bottom-0 inset-x-0 desktop:relative desktop:bottom-auto desktop:inset-x-auto"
                  stickyClassName="desktop:flex desktop:mt-[160px] !relative desktop:!fixed"
                  topOffset={-160}
                  bottomOffset={60}
                >
                  <div className="blocked-green flex flex-col justify-center items-center desktop:relative !px-sm desktop:!px-lg !py-sm desktop:!py-lg text-center">
                    <div className="hidden desktop:block absolute -top-lg mx-auto inset-x-0">
                      <Drop
                        setSize
                        className="!border-0 !bg-green-light"
                        dropIcon={<CompareArrowsOutlinedIcon className="!text-3xl" />}
                      />
                    </div>
                    <div className="hidden desktop:block mt-md">
                      <h2>Jämför utbildningar</h2>
                      <p className="text">
                        Lägg till minst två utbildningar du vill jämföra genom att trycka på “jämför” på respektive
                        utbildning.
                      </p>
                    </div>

                    <NextLink
                      className={cx(searchCompareList.length === 0 && 'pointer-events-none', 'desktop:mt-md')}
                      href={{
                        pathname: '/utbildningar/sok/jamfor',
                        query:
                          searchCompareList.length > 0 ?
                            {
                              id: searchCompareList
                                .map((x) => x.id?.toString())
                                .filter((id): id is string => id !== undefined),
                            }
                          : undefined,
                      }}
                    >
                      <Button
                        as="span"
                        disabled={searchCompareList.length === 0}
                        className="!px-md"
                        leftIcon={<CompareArrowsOutlinedIcon className="desktop:!hidden" />}
                      >
                        <span>
                          Jämför utbildningar{' '}
                          <span>{searchCompareList.length > 0 ? '(' + searchCompareList.length + ')' : ''}</span>
                        </span>
                      </Button>
                    </NextLink>

                    {searchCompareList.length > 0 && (
                      <Button
                        onClick={handleOnResetSearchCompareList}
                        variant="ghost"
                        className="p-0 mt-sm desktop:mt-md"
                      >
                        <Link as="div" className="text-[12px]">
                          Rensa alla utbildningar
                        </Link>
                      </Button>
                    )}
                  </div>
                </Sticky>
              </div>
            </div>
          : isPending ?
            ''
          : <div className="mt-2xl">
              {!isFiltersTouched ?
                'Ange ett sökrord eller använd filtreringen för att finna utbildningar.'
              : 'Inga utbildningar matchar sökningen.'}
            </div>
          }
        </div>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Sok;
