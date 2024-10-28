import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Breadcrumb } from '@sk-web-gui/react';
import ContentBlock from '@components/block/content-block.component';
import { Search } from '@components/search/search.component';
import NextLink from 'next/link';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import { getPage } from '@services/page-service';
import PromotionsBlock from '@components/promotions-block/promotions-block';
import FAQBlock from '@components/faq-block/faq-block';
import EmployerPromotionsBlock from '@components/employer-promotions-block/employer-promotions-block';
import EducationsStartingBlock from '@components/educations-starting-block/educations-starting-block';
import { getLayout } from '@services/layout-service';
import { PageProps } from '@interfaces/admin-data';
import _ from 'lodash';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  const pageProps = await getPage('/utbildningar', res);
  return await _.merge(layoutProps, pageProps);
}

export const Utbildningar: React.FC = ({ layoutData, pageData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Utbildningar`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc={`/drop-2-people.png`}
          imageAlt="Två studenter skrattar"
          imageDivClassName="hidden desktop:block"
          breadcrumbs={
            <Breadcrumb className="" separator={<span className="mx-1">|</span>}>
              <Breadcrumb.Item>
                <NextLink href="/" passHref legacyBehavior>
                  <Breadcrumb.Link href="/">Start</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/utbildningar" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage href="/utbildningar">
                    För dig som söker utbildning
                  </Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>{pageData.title}</h1>
          <p className="ingress">{pageData.description}</p>
          <Search />
        </BigDropHeader>
      </ContentBlock>
      <PromotionsBlock promotionsBlock={pageData.promotionsBlock?.pop()} />

      <EducationsStartingBlock educationsStartingBlock={pageData?.educationsStartingBlock?.pop()} />

      <EmployerPromotionsBlock employerPromotionsBlock={pageData?.employerPromotionsBlock} />

      <FAQBlock faqBlock={pageData?.faqBlock?.pop()} />
    </DefaultLayout>
  );
};

export default Utbildningar;
