'use client';

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
import { BlockType, PageData, PageProps } from '@interfaces/admin-data';
import Page from '@layouts/page-layout/page.component';
import { getBlockData } from '@utils/page-types';

const RenderBlock = ({ blockType, pageData }: { blockType: BlockType; pageData: PageData }) => {
  switch (blockType) {
    case 'wysiwyg_content':
      return (
        <>
          {pageData?.wysiwyg_content ?
            <ContentBlock classNameWrapper={!pageData?.showSearchBar ? '!mt-0' : ''}>
              <Wysiwyg content={pageData?.wysiwyg_content} />
            </ContentBlock>
          : <></>}
        </>
      );
    case 'tableBlock':
      return (
        <>
          {pageData?.tableBlock ?
            <ContentBlock>
              <TableBlock tableBlock={getBlockData(pageData?.tableBlock)} />
            </ContentBlock>
          : <></>}
        </>
      );
    case 'promotionsBlock':
      return <PromotionsBlock promotionsBlock={getBlockData(pageData?.promotionsBlock)} />;
    case 'mapBlock':
      return <MapBlock mapBlock={getBlockData(pageData?.mapBlock)} />;
    case 'employerPromotionsBlock':
      return (
        <EmployerPromotionsBlock
          showBlock={pageData?.showEmployerPromotionsBlock}
          employerPromotionsBlock={pageData?.employerPromotionsBlock}
        />
      );
    case 'educationsStartingBlock':
      return <EducationsStartingBlock educationsStartingBlock={pageData?.educationsStartingBlock} />;
    case 'importantDatesBlock':
      return <ImportantDatesBlock importantDatesBlock={getBlockData(pageData?.importantDatesBlock)} />;
    case 'faqBlock':
      return <FAQBlock faqBlock={getBlockData(pageData?.faqBlock)} />;
    case 'contactFormBlock':
      return (
        <>
          {pageData?.contactFormBlock ?
            <ContactFormBlock contactFormBlock={getBlockData(pageData?.contactFormBlock)} />
          : <></>}
        </>
      );
    case 'searchBlock':
      return <SearchBlock show={pageData?.showSearchBlock} />;
    case 'logosBlock':
      return <LogosBlock logosBlock={getBlockData(pageData?.logosBlock)} />;
    default:
      <></>;
  }
};

export default function StandardPage(props: PageProps) {
  const { pageData } = props;
  const order: BlockType[] = pageData?.blockOrder?.split(',') as BlockType[];
  if (!pageData) return null;
  return (
    <Page {...props}>
      <>{order?.map((blockType, i) => <RenderBlock key={`${i}`} pageData={pageData} blockType={blockType} />)}</>
    </Page>
  );
}
