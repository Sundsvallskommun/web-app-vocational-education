import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import ButtonStackedIcon from '@components/button/button-stacked-icon.component';
import Button from '@components/button/button.component';
import CompareCards from '@components/compare/compare-cards.component';
import CompareList from '@components/compare/compare-list.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import { useAppContext } from '@contexts/app-context/use-app-context';
import { PageProps } from '@interfaces/admin-data';
import { Course } from '@interfaces/education';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CropPortraitOutlinedIcon from '@mui/icons-material/CropPortraitOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { cx, Link } from '@sk-web-gui/react';
import { getStandardPageProps } from '@utils/page-types';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getStandardPageProps(context);
}

export const Compare = ({ layoutData, pageData }: PageProps) => {
  const { searchCompareList, setSearchCompareList } = useAppContext();
  const [activeListing, setActiveListing] = useState(1);
  const router = useRouter();

  const handleBackLink = () => {
    router.back();
  };

  const handleOnClickListing = (item: number) => {
    setActiveListing(item);
  };

  const onRemove = (item: Course) => {
    setSearchCompareList((list) => list.filter((x) => x.id !== item.id));
  };

  return (
    <DefaultLayout title={`Yrkesutbildning - ${pageData?.title}`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc={pageData?.imgSrc}
          imageAlt={pageData?.imgAlt}
          imageDivClassName={cx(
            pageData?.showImgInMobile ? 'block' : 'hidden',
            pageData?.showImgInDesktop ? 'desktop:block' : 'desktop:hidden'
          )}
          breadcrumbs={<Breadcrumbs />}
        >
          <h1>{pageData?.title}</h1>
          {pageData.description ?
            <p className="ingress">{pageData.description}</p>
          : <></>}
        </BigDropHeader>
        <div className="w-full flex justify-between">
          <Button variant="ghost" className="inline-block justify-start mt-md" onClick={handleBackLink}>
            <Link as="span" className="text-sm">
              <ArrowBackOutlinedIcon className="material-icon mr-sm" />
              <span>Tillbaka till sökresultat</span>
            </Link>
          </Button>
          <div className="gap-md hidden desktop:flex">
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
          </div>
        </div>
      </ContentBlock>
      <ContentBlock className="px-0" classNameWrapper="!mt-xl" classNameContent="to-tablet:px-0">
        {activeListing == 0 && <CompareList compareList={searchCompareList} onRemove={onRemove} />}
        {activeListing == 1 && <CompareCards compareList={searchCompareList} onRemove={onRemove} />}
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Compare;
