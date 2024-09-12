import ContentBlock from '@components/block/content-block.component';
import Button from '@components/button/button.component';
import Drop from '@components/drop/drop.component';
import EducationsCards from '@components/search/educations-cards/educations-cards.component';
import EducationsTable from '@components/search/educations-table/educations-table.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import EducationsFilters from '@components/search/educations-filters.component';
import Search from '@components/search/search.component';
import { useAppContext } from '@contexts/app.context';
import { LayoutProps } from '@interfaces/admin-data';
import { Course, EducationFilterOptions, PagingMetaData } from '@interfaces/education';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import {
  defaultEducationFilterOptions,
  emptyEducationFilterOptions,
  getEducationEvents,
} from '@services/education-service/education-service';
import { getLayout } from '@services/layout-service';
import { Breadcrumb, Link, Spinner, cx, omit } from '@sk-web-gui/react';
import { ValueOf } from '@utils/types';
import { addToQueryString, createObjectFromQueryString } from '@utils/url';
import _ from 'lodash';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import React, { useEffect, useState } from 'react';
import Sticky from 'react-sticky-el';

export async function getServerSideProps({ res }) {
  return await getLayout(res);
}

export const Sok: React.FC = ({ layoutData }: LayoutProps) => {
  const { searchCompareList, setSearchCompareList } = useAppContext();

  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeListing, setActiveListing] = useState(1);

  const [_meta, setPageMeta] = useState<PagingMetaData | undefined>();
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [searchQuery, setSearchQuery] = useState<string>(defaultEducationFilterOptions.q);
  const [searchFilters, setSearchFilters] = useState<EducationFilterOptions>(
    omit(defaultEducationFilterOptions, ['q'])
  );

  // pagination
  const [pageSize, setPageSize] = useState<number>(defaultEducationFilterOptions.size);
  const [page, setPage] = useState<number>(defaultEducationFilterOptions.page);

  const [isFiltersTouched, setIsFiltersTouched] = useState(false);

  const updateParams = (query: string | ParsedUrlQueryInput) => {
    router.replace(
      {
        pathname: router.pathname,
        query: query,
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
    updateParams(addToQueryString({ page }));
  };

  const handleSetPageSize = (size) => {
    if (typeof size === 'function') {
      return handleSetPageSize(size(pageSize));
    }
    setPageSize(size);
    updateParams(addToQueryString({ size }));
  };

  const handleSetActiveListing = (listType: number) => {
    setPageSize(defaultEducationFilterOptions.size);
    setPage(defaultEducationFilterOptions.page);
    updateParams(
      addToQueryString({ page: defaultEducationFilterOptions.page, size: defaultEducationFilterOptions.size })
    );
    setActiveListing(listType);
  };

  const fetchSearch = (filterData?: EducationFilterOptions) => {
    setIsLoading(true);
    getEducationEvents({ ...filterData }).then((res) => {
      if (!res.error) {
        setSearchResults(res.courses);
        setPageMeta(res._meta);
      }
      setIsLoading(false);
    });
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
      objectReference: emptyEducationFilterOptions,
      objectReferenceAsBase: true,
    });
    if (!_.isEqual(omit(filters, ['q']), filterData)) {
      updateParams(addToQueryString(filterData as Record<string, ValueOf<EducationFilterOptions>>));
    }
  };

  const handleOnResetSearchCompareList = () => {
    setSearchCompareList([]);
  };

  useEffect(() => {
    const filters = createObjectFromQueryString(window.location.search, {
      objectReference: emptyEducationFilterOptions,
    });
    const filtersWithBaseDefaults = Object.assign(
      {},
      emptyEducationFilterOptions,
      Object.keys(filters).length === 1 && filters.q ? defaultEducationFilterOptions : {},
      {
        page: page,
        size: pageSize,
      },
      filters
    );
    const updatedQuery = filtersWithBaseDefaults.q;
    const isQueryChanged = updatedQuery !== searchQuery;

    const updatedFilters = omit(filtersWithBaseDefaults, ['q']);
    const isFiltersChanged = !_.isEqual(updatedFilters, searchFilters);

    const isChanged = isQueryChanged || isFiltersChanged;

    if (isQueryChanged) {
      setSearchQuery(updatedQuery);
    }

    if (isFiltersChanged) {
      setSearchFilters(updatedFilters);
    }

    if (isChanged) {
      setIsFiltersTouched(true);
      fetchSearch(filtersWithBaseDefaults);
      updateParams(
        addToQueryString(filtersWithBaseDefaults as unknown as Record<string, ValueOf<EducationFilterOptions>>)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <DefaultLayout
      title={`Yrkesutbildning - Sok${searchQuery ? ` - Sökord:${searchQuery}` : ''}`}
      layoutData={layoutData}
    >
      <ContentBlock>
        <BigDropHeader
          imageSrc="/drop-2-people.png"
          imageAlt="Två studenter skrattar"
          imageDivClassName="hidden desktop:block"
          breadcrumbs={
            <Breadcrumb className="text-[13px]" separator={<span className="mx-1">|</span>}>
              <Breadcrumb.Item>
                <NextLink href="/" passHref legacyBehavior>
                  <Breadcrumb.Link href="/">Start</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/utbildningar" passHref legacyBehavior>
                  <Breadcrumb.Link href="/utbildningar">För dig som söker utbildning</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/utbildningar/sok" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage href="/utbildningar/sok">
                    {searchQuery ? 'Sökresultat: ' + searchQuery : 'Sök'}
                  </Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>Sugen på att börja studera?</h1>

          <Search className="phone:mt-[25px] mt-2xl" keepParams />
          {isFiltersTouched && (
            <>
              <h2 className="mt-md desktop:mt-[7.25rem] text-large desktop:text-[2.6rem] leading-[3.6rem] mb-0">
                {isLoading ?
                  <>
                    Sökresultat laddar för <strong>{searchQuery}</strong>
                  </>
                : <>
                    Din sökning<strong>{` ${searchQuery} `}</strong>gav{' '}
                    <strong>
                      {!_meta || _meta?.totalRecords == 0 ?
                        <span>Inga träffar</span>
                      : <>
                          <span>{_meta?.totalRecords}</span>{' '}
                          {_meta?.totalRecords > 1 || _meta?.totalRecords == 0 ? 'träffar' : 'träff'}
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

          {isLoading && (
            <div className="mt-md w-full flex justify-center">
              <Spinner aria-label="Laddar sökresultat" />
            </div>
          )}
          {!isLoading && searchResults.length > 0 ?
            <div className="mt-md desktop:mt-[6.6rem] flex flex-col gap-lg desktop:flex-row">
              <div className="w-full flex flex-col gap-lg desktop:w-[830px]">
                {activeListing === 1 ?
                  <EducationsCards
                    educations={searchResults}
                    handleCheckboxClick={handleCheckboxClick}
                    _meta={_meta}
                    setPageSize={handleSetPageSize}
                  />
                : <EducationsTable
                    educations={searchResults}
                    handleCheckboxClick={handleCheckboxClick}
                    _meta={_meta}
                    setPage={handleSetPage}
                  />
                }
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
                        query: searchCompareList ? { id: searchCompareList.map((x) => x.id) } : undefined,
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
          : isLoading ?
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
