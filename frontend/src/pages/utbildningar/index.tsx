import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import EducationsStartingBlock from '@components/educations-starting-block/educations-starting-block';
import EmployerPromotionsBlock from '@components/employer-promotions-block/employer-promotions-block';
import FAQBlock from '@components/faq-block/faq-block';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import PromotionsBlock from '@components/promotions-block/promotions-block';
import { Search } from '@components/search/search.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { cx } from '@sk-web-gui/react';
import { getBlockData, getStandardPageProps } from '@utils/page-types';

export async function getServerSideProps(context) {
  return getStandardPageProps(context);
}

export const Utbildningar: React.FC = ({ layoutData, pageData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Utbildningar`} layoutData={layoutData}>
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
          <h1>{pageData.title}</h1>
          {pageData.description ?
            <p className="ingress">{pageData.description}</p>
          : <></>}
          <Search />
        </BigDropHeader>
      </ContentBlock>
      <PromotionsBlock promotionsBlock={getBlockData(pageData?.promotionsBlock)} />

      <EducationsStartingBlock educationsStartingBlock={getBlockData(pageData?.educationsStartingBlock)} />

      <EmployerPromotionsBlock employerPromotionsBlock={pageData?.employerPromotionsBlock} />

      <FAQBlock faqBlock={getBlockData(pageData?.faqBlock)} />
    </DefaultLayout>
  );
};

export default Utbildningar;
