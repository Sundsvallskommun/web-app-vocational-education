import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import ContactFormBlock from '@components/contact-form-block/contact-form-block.component';
import EducationsRelatedBlock from '@components/educations-related-block/educations-related-block';
import EmployerPromotionsBlock from '@components/employer-promotions-block/employer-promotions-block';
import FAQBlock from '@components/faq-block/faq-block';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import ImportantDatesBlock from '@components/importantdates-block/importantdates-block';
import LogosBlock from '@components/logos-block/logos-block';
import MapBlock from '@components/map-block/map-block';
import PromotionsBlock from '@components/promotions-block/promotions-block';
import SearchBlock from '@components/search-block/search-block.component';
import TableBlock from '@components/table-block/table-block.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { cx } from '@sk-web-gui/react';
import { getBlockData } from '@utils/page-types';

export default function StandardPage({ layoutData, pageData }: PageProps) {
  return (
    <DefaultLayout title={`Yrkesutbildning - ${pageData.title}`} layoutData={layoutData}>
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
        </BigDropHeader>
      </ContentBlock>

      {pageData.wysiwyg_content ?
        <ContentBlock classNameWrapper="!mt-0">
          <Wysiwyg content={pageData.wysiwyg_content} />
        </ContentBlock>
      : <></>}

      {pageData.tableBlock ?
        <ContentBlock>
          <TableBlock tableBlock={getBlockData(pageData?.tableBlock)} />
        </ContentBlock>
      : <></>}

      <PromotionsBlock promotionsBlock={getBlockData(pageData?.promotionsBlock)} />

      <MapBlock mapBlock={getBlockData(pageData?.mapBlock)} />

      <EmployerPromotionsBlock employerPromotionsBlock={pageData.employerPromotionsBlock} />

      <EducationsRelatedBlock
        show={pageData.showEducationsRelatedBlock}
        educations={Array.from({ length: 3 }, (_, i) => ({
          title: `${pageData.title}-related-${i}`,
          text: 'Amet minimimi mollot non deseret ullamco est sit alique dolor do sint. Velit officia consequat duis enim.',
          courseCode: `${i}`,
          date: new Date(),
          studyLocation: `Location-${i}`,
        }))}
      />

      <ImportantDatesBlock importantDatesBlock={getBlockData(pageData?.importantDatesBlock)} />

      <FAQBlock faqBlock={getBlockData(pageData?.faqBlock)} />

      {pageData?.contactFormBlock ?
        <ContactFormBlock contactFormBlock={getBlockData(pageData?.contactFormBlock)} />
      : <></>}

      <SearchBlock show={pageData?.showSearchBlock} />

      <LogosBlock logosBlock={getBlockData(pageData?.logosBlock)} />
    </DefaultLayout>
  );
}
