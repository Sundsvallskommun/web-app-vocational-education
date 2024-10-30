import ContentBlock from '@components/block/content-block.component';
import EducationsStartingBlock from '@components/educations-starting-block/educations-starting-block';
import EmployerPromotionsBlock from '@components/employer-promotions-block/employer-promotions-block';
import FAQBlock from '@components/faq-block/faq-block';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import PromotionsBlock from '@components/promotions-block/promotions-block';
import { Search } from '@components/search/search.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Breadcrumb } from '@sk-web-gui/react';
import { getBlockData, getStandardPageProps } from '@utils/page-types';
import NextLink from 'next/link';

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
      <PromotionsBlock promotionsBlock={getBlockData(pageData?.promotionsBlock)} />

      <EducationsStartingBlock educationsStartingBlock={getBlockData(pageData?.educationsStartingBlock)} />

      <EmployerPromotionsBlock employerPromotionsBlock={pageData?.employerPromotionsBlock} />

      <FAQBlock faqBlock={getBlockData(pageData?.faqBlock)} />
    </DefaultLayout>
  );
};

export default Utbildningar;
