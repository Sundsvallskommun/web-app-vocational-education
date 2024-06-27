import DefaultLayout from '@layouts/default-layout/default-layout.component';
import ContentBlock from '@components/block/content-block.component';
import { Search } from '@components/search/search.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import { PageProps } from '@interfaces/admin-data';
import { getPage } from '@services/page-service';
import PromotionsBlock from '@components/promotions-block/promotions-block';
import MapBlock from '@components/map-block/map-block';
import ImportantDatesBlock from '@components/importantdates-block/importantdates-block';
import FAQBlock from '@components/faq-block/faq-block';
import EmployerPromotionsBlock from '@components/employer-promotions-block/employer-promotions-block';
import LogosBlock from '@components/logos-block/logos-block';
import { getLayout } from '@services/layout-service';
import _ from 'lodash';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  const pageProps = await getPage('/', res);
  return await _.merge(layoutProps, pageProps);
}

export const Start: React.FC = ({ pageData, layoutData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Startsida`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc="/drop-2-people-2.png"
          imageAlt="Två studenter skrattar"
          imageDivClassName="hidden desktop:block"
        >
          <h1>{pageData.title}</h1>
          <p className="ingress">{pageData.description}</p>
          <Search />
        </BigDropHeader>

        <PromotionsBlock promotionsBlock={pageData.promotionsBlock?.pop()} />
      </ContentBlock>

      <MapBlock mapBlock={pageData.mapBlock?.pop()} />

      <EmployerPromotionsBlock employerPromotionsBlock={pageData.employerPromotionsBlock?.pop()} />

      <ImportantDatesBlock importantDatesBlock={pageData.importantDatesBlock?.pop()} />

      <FAQBlock faqBlock={pageData.faqBlock?.pop()} />

      <LogosBlock logosBlock={pageData.logosBlock?.pop()} />
    </DefaultLayout>
  );
};

export default Start;
