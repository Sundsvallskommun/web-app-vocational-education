import LoadMoreBlock from '@components/block/load-more-block.component';
import ButtonStackedIcon from '@components/button/button-stacked-icon.component';
import DropCard from '@components/card/drop-card.component';
import SavedContentBlockEmpty from '@components/saved-content-block/saved-content-block-empty.component';
import SavedContentBlock from '@components/saved-content-block/saved-content-block.component';
import { EducationFilterOptions } from '@interfaces/education';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { getFilterOptionString } from '@services/education-service/education-service';
import { useUserStore } from '@services/user-service/user-service';
import { useSnackbar, useThemeQueries } from '@sk-web-gui/react';
import { useEffect, useState } from 'react';

export default function SavedSearches() {
  const getSavedSearches = useUserStore((s) => s.getSavedSearches);
  const deleteSavedSearch = useUserStore((s) => s.deleteSavedSearch);
  const userSavedSearches = useUserStore((s) => s.userSavedSearches);
  const snackBar = useSnackbar();
  const { isMinDesktop } = useThemeQueries();

  const [pageSize] = useState<number>(4);
  const [page, setPage] = useState<number>(1);
  const pagedList = userSavedSearches.slice(0, (page - 1) * pageSize + pageSize);

  const loadMoreCallback = () => {
    setPage((page) => page + 1);
  };

  const handleRemoveSearch = (id: number) => async () => {
    const res = await deleteSavedSearch(id);
    if (!res.error) {
      snackBar({
        message: 'Den sparade sökningen är nu borttagen.',
        status: 'success',
      });
    } else {
      snackBar({
        message: 'Det gick inte att ta bort den sparade sökningen.',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    getSavedSearches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userSavedSearches.length > 0 || isMinDesktop ?
        <h2>Mina sparade sökningar</h2>
      : <></>}
      <div className="grow flex flex-col mt-md">
        {userSavedSearches.length > 0 ?
          <SavedContentBlock className="desktop:!px-[3.3rem]">
            {pagedList.map((search, index) => (
              <DropCard
                key={`${index}`}
                href={`/utbildningar/sok?${search.parameters}`}
                dropIcon={<SearchIcon className="min-w-[3.2rem] min-h-[3.2rem]" />}
                footer={<></>}
                toolbar={
                  <>
                    <ButtonStackedIcon
                      onClick={handleRemoveSearch(search.id)}
                      className="text-[12px] text-blue"
                      icon={<DeleteIcon />}
                    >
                      Radera
                    </ButtonStackedIcon>
                  </>
                }
              >
                <div className="inline-flex">
                  <h3 className="capitalize">{search.searchTerm}</h3>
                </div>
                <ul className="search-filter-list">
                  {Object.keys(search.educationFilterOptions).map((filter) => (
                    <li key={`${filter}`}>
                      <FilterListIcon className="!text-2xl mr-sm" />
                      <span>
                        {getFilterOptionString(
                          filter as keyof EducationFilterOptions,
                          search.educationFilterOptions[filter as keyof EducationFilterOptions]
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </DropCard>
            ))}
          </SavedContentBlock>
        : <></>}
        {userSavedSearches.length === 0 && (
          <SavedContentBlock className="grow">
            <SavedContentBlockEmpty>Här kommer du kunna se dina sparade sökningar</SavedContentBlockEmpty>
          </SavedContentBlock>
        )}
        {userSavedSearches.length > pagedList.length && (
          <LoadMoreBlock
            loadMoreColorClass="text-white"
            loadMoreCallback={loadMoreCallback}
            className="absolute top-[1.75rem]"
          />
        )}
      </div>
    </>
  );
}
