import ContentBlock from '@components/block/content-block.component';
import ButtonStackedIcon from '@components/button/button-stacked-icon.component';
import Button from '@components/button/button.component';
import CompareCards from '@components/compare/compare-cards.component';
import CompareList from '@components/compare/compare-list.component';
import { useAppContext } from '@contexts/app.context';
import { LayoutProps } from '@interfaces/admin-data';
import { Course } from '@interfaces/education';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CropPortraitOutlinedIcon from '@mui/icons-material/CropPortraitOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { getLayout } from '@services/layout-service';
import { Breadcrumb, Link } from '@sk-web-gui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export async function getServerSideProps({ res }) {
  return await getLayout(res);
}

export const Compare: React.FC = ({ layoutData }: LayoutProps) => {
  const { searchCompareList, setSearchCompareList } = useAppContext();
  const [activeListing, setActiveListing] = useState(1);
  const router = useRouter();

  // Handle URL-params: ?id=e.fbr.288992.378951&id=e.fbr.288992.378947 setSearchCompareList

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
    <DefaultLayout title={`Yrkesutbildning - Jämför`} layoutData={layoutData}>
      <ContentBlock>
        <div className="lg:flex">
          <div className="flex-grow flex flex-col lg:mt-lg lg:pr-xl">
            <div>
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
                    <Breadcrumb.Link href="/utbildningar/sok">Sökresultat</Breadcrumb.Link>
                  </NextLink>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <NextLink href="/utbildningar/sok/jamfor" passHref legacyBehavior>
                    <Breadcrumb.Link currentPage href="/utbildningar/sok/jamfor">
                      Jämför utbildningar
                    </Breadcrumb.Link>
                  </NextLink>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="h-full flex-grow flex flex-col justify-center max-w-[720px]">
              <div className="flex justify-between md:justify-start items-center">
                <h1 className="m-0">Jämför utbildningar</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button variant="ghost" className="inline-block justify-start mt-md" onClick={handleBackLink}>
            <Link as="span" className="text-sm">
              <ArrowBackOutlinedIcon className="material-icon mr-sm" />
              <span>Tillbaka till sökresultat</span>
            </Link>
          </Button>
          <div className="gap-md hidden lg:flex">
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
      <ContentBlock classNameWrapper="!mt-xl" classNameContent="to-tablet:px-0">
        {activeListing == 0 && <CompareList compareList={searchCompareList} onRemove={onRemove} />}
        {activeListing == 1 && <CompareCards compareList={searchCompareList} onRemove={onRemove} />}
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Compare;
