import ContentBlock from '@components/block/content-block.component';
import EmployerPromotionsBlock from '@components/employer-promotions-block/employer-promotions-block';
import FAQBlock from '@components/faq-block/faq-block';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import ImportantDatesBlock from '@components/importantdates-block/importantdates-block';
import LogosBlock from '@components/logos-block/logos-block';
import MapBlock from '@components/map-block/map-block';
import PromotionsBlock from '@components/promotions-block/promotions-block';
import { Search } from '@components/search/search.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { getBlockData, getStandardPageProps } from '@utils/page-types';

export async function getServerSideProps(context) {
  return getStandardPageProps(context);
}

export const Start: React.FC = ({ pageData, layoutData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Startsida`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader imageSrc={pageData?.imgSrc} imageAlt={pageData?.imgAlt} imageDivClassName="hidden desktop:block">
          <h1>{pageData.title}</h1>
          <p className="ingress">{pageData.description}</p>
          <Search />
        </BigDropHeader>
      </ContentBlock>
      <PromotionsBlock promotionsBlock={getBlockData(pageData?.promotionsBlock)} />

      <MapBlock mapBlock={getBlockData(pageData?.mapBlock)} />

      <EmployerPromotionsBlock employerPromotionsBlock={pageData?.employerPromotionsBlock} />

      <ImportantDatesBlock importantDatesBlock={getBlockData(pageData?.importantDatesBlock)} />

      <FAQBlock faqBlock={getBlockData(pageData?.faqBlock)} />

      <LogosBlock logosBlock={getBlockData(pageData?.logosBlock)} />
    </DefaultLayout>
  );
};

export default Start;
