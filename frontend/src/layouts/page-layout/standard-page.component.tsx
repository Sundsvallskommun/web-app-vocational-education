import ContentBlock from '@components/block/content-block.component';
import ContactFormBlock from '@components/contact-form-block/contact-form-block.component';
import EducationsStartingBlock from '@components/educations-starting-block/educations-starting-block';
import EmployerPromotionsBlock from '@components/employer-promotions-block/employer-promotions-block';
import FAQBlock from '@components/faq-block/faq-block';
import ImportantDatesBlock from '@components/importantdates-block/importantdates-block';
import LogosBlock from '@components/logos-block/logos-block';
import MapBlock from '@components/map-block/map-block';
import PromotionsBlock from '@components/promotions-block/promotions-block';
import SearchBlock from '@components/search-block/search-block.component';
import TableBlock from '@components/table-block/table-block.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { PageProps } from '@interfaces/admin-data';
import Page from '@layouts/page-layout/page.component';
import { getBlockData } from '@utils/page-types';

export default function StandardPage(props: PageProps) {
  const { pageData } = props;
  return (
    <Page {...props}>
      <>
        {pageData?.wysiwyg_content ?
          <ContentBlock classNameWrapper="!mt-0">
            <Wysiwyg content={pageData?.wysiwyg_content} />
          </ContentBlock>
        : <></>}
        {pageData?.tableBlock ?
          <ContentBlock>
            <TableBlock tableBlock={getBlockData(pageData?.tableBlock)} />
          </ContentBlock>
        : <></>}
        <PromotionsBlock promotionsBlock={getBlockData(pageData?.promotionsBlock)} />
        <MapBlock mapBlock={getBlockData(pageData?.mapBlock)} />
        <EmployerPromotionsBlock employerPromotionsBlock={pageData?.employerPromotionsBlock} />
        <EducationsStartingBlock educationsStartingBlock={pageData?.educationsStartingBlock} />
        <ImportantDatesBlock importantDatesBlock={getBlockData(pageData?.importantDatesBlock)} />
        <FAQBlock faqBlock={getBlockData(pageData?.faqBlock)} />
        {pageData?.contactFormBlock ?
          <ContactFormBlock contactFormBlock={getBlockData(pageData?.contactFormBlock)} />
        : <></>}
        <SearchBlock show={pageData?.showSearchBlock} />
        <LogosBlock logosBlock={getBlockData(pageData?.logosBlock)} />
      </>
    </Page>
  );
}
