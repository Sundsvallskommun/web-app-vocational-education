import ButtonStackedIcon from '@components/button/button-stacked-icon.component';
import Button from '@components/button/button.component';
import MenuModal from '@components/modal/menu-modal.component';
import { EducationFilterOptions } from '@interfaces/education';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CropPortraitOutlinedIcon from '@mui/icons-material/CropPortraitOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { defaultEducationFilterOptions } from '@services/education-service/education-service';
import { useUserStore } from '@services/user-service/user-service';
import { cx, useSnackbar } from '@sk-web-gui/react';
import { objToQueryString } from '@utils/url';
import { useWindowSize } from '@utils/use-window-size.hook';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import CategoryInput from '../form/category.input.component';
import DistanceInput from '../form/distance.input.component';
import LatestApplicationDateInput from '../form/latest-application-date.input.component';
import LocationInput from '../form/location.input.component';
import PaceOfStudyInput from '../form/pace-of-study.input.component';
import SortFunctionInput from '../form/sort-function.input.component';
import StartDateInput from '../form/start-date.input.component';
import TypeInput from '../form/type.input.component';
import Tags from './educations-filters/tags.component';

export const EducationsFilters: React.FC<{
  searchQuery: string;
  activeListing: number;
  setActiveListing: React.Dispatch<React.SetStateAction<number>>;
  submitCallback: (data: EducationFilterOptions) => void;
  formData?: Partial<EducationFilterOptions>;
}> = ({ searchQuery, activeListing, setActiveListing, submitCallback, formData = defaultEducationFilterOptions }) => {
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(null);
  const getSavedSearches = useUserStore((s) => s.getSavedSearches);
  const userSavedSearches = useUserStore((s) => s.userSavedSearches);
  const newSavedSearch = useUserStore((s) => s.newSavedSearch);
  const user = useUserStore((s) => s.user);

  const { windowSize } = useWindowSize();
  const snackBar = useSnackbar();

  const context = useForm<EducationFilterOptions>({
    defaultValues: formData,
    mode: 'onChange',
  });

  const { watch, handleSubmit, reset, getValues, formState } = context;

  const currentParameters = objToQueryString({ ...getValues(), q: searchQuery });

  const isSavedSearch = userSavedSearches.filter((x) => _.isEqual(x.parameters, currentParameters)).length > 0;

  const handleOnClickListing = (item: number) => {
    setActiveListing(item);
  };

  const handleOnSubmit = (filterValues: EducationFilterOptions) => {
    submitCallback(filterValues);
  };

  const handleOnFilterOpen = () => {
    setFilterModalIsOpen(true);
  };

  const handleOnFilterClose = () => {
    setFilterModalIsOpen(false);
  };

  const handleOnFilter = () => {
    handleOnFilterClose();
  };

  const handleFilterItems = (open: boolean) => {
    const filterItems = document.querySelectorAll('.filter-items-desktop > *');
    filterItems.forEach((item: HTMLElement) => {
      const itemWidth = item.getBoundingClientRect().width;
      item.style.maxWidth = itemWidth + 'px';
    });
    if (open || open === null) {
      setFilterIsOpen(false);
    } else {
      setFilterIsOpen(true);
    }
  };

  const handleToggleFilterList = () => {
    handleFilterItems(filterIsOpen);
  };

  const handleSaveSearch = async () => {
    const res = await newSavedSearch({
      searchTerm: searchQuery,
      parameters: currentParameters,
    });
    if (!res.error) {
      snackBar({
        message: 'Sökningen sparades.',
        status: 'success',
      });
    } else {
      snackBar({
        message: 'Det gick inte att spara sökningen.',
        status: 'error',
      });
    }
  };

  useEffect(() => {
    if (!_.isEqual(formState.defaultValues, formData)) {
      reset(formData);
    }
  }, [formData, reset, formState.defaultValues]);

  useEffect(() => {
    setTimeout(() => {
      handleFilterItems(filterIsOpen);
    }, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const subscription = watch(() => handleSubmit(handleOnSubmit)());
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, watch]);

  useEffect(() => {
    if (user.permissions.userSaveSearches) {
      getSavedSearches();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
      <FormProvider {...context}>
        {windowSize.mobile && !windowSize.lg && (
          <div className="search-filter">
            <Button type="button" onClick={handleOnFilterOpen} className="mt-lg w-full" leftIcon={<FilterListIcon />}>
              <span>Filtrera / Sortera (3)</span>
            </Button>
            {filterModalIsOpen && (
              <MenuModal
                show={filterModalIsOpen}
                className="search-filter h-screen pb-[70px]"
                onClose={handleOnFilterClose}
              >
                <h3 className="flex justify-center items-center gap-sm mt-xl">
                  <FilterListIcon className="!text-[1em]" /> Filtrera / Sortera
                </h3>
                <Tags />
                <div className="mt-lg flex flex-col gap-md">
                  <SortFunctionInput />
                  <CategoryInput />
                  <TypeInput />
                  <LocationInput />
                  <DistanceInput />

                  <LatestApplicationDateInput />
                  <StartDateInput />
                  <PaceOfStudyInput />
                </div>
                <Button type="button" onClick={handleOnFilter} className="mt-2xl mx-auto min-w-[242px]">
                  <span>Sortera</span>
                </Button>
              </MenuModal>
            )}
            <div className="flex justify-between mt-lg "></div>
          </div>
        )}

        {windowSize.lg && (
          <div className="search-filter">
            <div className="flex items-end justify-between mt-xl">
              <h3 className="flex items-center">
                <FilterListIcon className="!text-[1em] mr-[1.25rem]" /> Filtrera / Sortera
              </h3>
              <div className="gap-md lg:flex lg:items-center">
                <ButtonStackedIcon
                  active={activeListing == 0}
                  onClick={() => handleOnClickListing(0)}
                  className="text-[12px]"
                  icon={<FormatListBulletedOutlinedIcon />}
                >
                  Lista
                </ButtonStackedIcon>
                <ButtonStackedIcon
                  active={activeListing == 1}
                  onClick={() => handleOnClickListing(1)}
                  className="text-[12px]"
                  icon={<CropPortraitOutlinedIcon />}
                >
                  Kort
                </ButtonStackedIcon>
                {user.permissions.userSaveSearches && (
                  <>
                    <div className="w-[.1rem] h-[3rem] bg-border-color"></div>
                    <ButtonStackedIcon
                      disabled={isSavedSearch}
                      onClick={handleSaveSearch}
                      className="text-[12px]"
                      icon={<FavoriteBorderOutlinedIcon />}
                    >
                      Spara
                    </ButtonStackedIcon>
                  </>
                )}
              </div>
            </div>
            <div className="mt-md border border-border-color rounded bg-green-light">
              <div className="filter-items-desktop">
                <SortFunctionInput />
                <CategoryInput />
                <TypeInput />
                <LocationInput />
                <DistanceInput />

                <Button
                  type="button"
                  onClick={handleToggleFilterList}
                  className="more-button"
                  variant="ghost"
                  size="sm"
                  aria-expanded={filterIsOpen}
                  rightIcon={filterIsOpen ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
                >
                  <span>{filterIsOpen ? 'Mindre' : 'Fler'} filtreringar</span>
                </Button>
              </div>
              <div className={cx('filter-items-desktop', filterIsOpen === false && 'invisible h-0')}>
                <LatestApplicationDateInput />
                <StartDateInput />
                <PaceOfStudyInput />
              </div>
            </div>

            <Tags />
          </div>
        )}
      </FormProvider>
    </form>
  );
};

export default EducationsFilters;
