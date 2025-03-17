'use client';

import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import Button from '@components/button/button.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { EmployerPromotionsBlockPromotions, PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { cx } from '@sk-web-gui/react';
import NextLink from 'next/link';

export interface EfterfragadeProps extends PageProps {
  educationData: EmployerPromotionsBlockPromotions | null;
}

export const Efterfragade: React.FC<EfterfragadeProps> = ({ layoutData, pageData, educationData }) => {
  if (!educationData) return <></>;

  return (
    <DefaultLayout layoutData={layoutData}>
      <ContentBlock classNameWrapper="HeaderBlock">
        <BigDropHeader
          imageSrc={pageData?.imgSrc}
          imageAlt={pageData?.imgAlt}
          imageDivClassName={cx(
            pageData?.showImgInMobile ? 'block' : 'hidden',
            pageData?.showImgInDesktop ? 'desktop:block' : 'desktop:hidden'
          )}
          breadcrumbs={<Breadcrumbs />}
        >
          <h1>{educationData.title}</h1>
          {educationData.ingress ?
            <p className="ingress">{educationData.ingress}</p>
          : <></>}
        </BigDropHeader>

        <div className="mt-lg">
          <Wysiwyg content={educationData.wysiwyg_content} />

          <NextLink href={`/utbildningar/sok?q=${educationData.searchPhrase}`}>
            <Button as="span" className="override !mt-2xl w-fit" rightIcon={<ArrowForwardIcon />}>
              <span>Vidare till utbildningen</span>
            </Button>
          </NextLink>
        </div>
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Efterfragade;
