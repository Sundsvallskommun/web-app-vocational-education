import ContentBlock from '@components/block/content-block.component';
import EducationsRelatedBlock from '@components/educations-related-block/educations-related-block';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import SearchBlock from '@components/search-block/search-block.component';
import Wysiwyg from '@components/wysiwyg/wysiwyg';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Breadcrumb } from '@sk-web-gui/react';
import NextLink from 'next/link';

export default function StandardPage({ layoutData, pageData }: PageProps) {
  return (
    <DefaultLayout title={`Yrkesutbildning - ${pageData.title}`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc={pageData?.imgSrc}
          imageAlt={pageData?.imgAlt}
          breadcrumbs={
            <Breadcrumb className="" separator={<span className="mx-1">|</span>}>
              <Breadcrumb.Item>
                <NextLink href="/" passHref legacyBehavior>
                  <Breadcrumb.Link href="/">Start</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/utbildningar" passHref legacyBehavior>
                  <Breadcrumb.Link href="/utbildningar">Utbildningar</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/utbildningar/behorighet" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage href="/utbildningar/behorighet">
                    Behörighet, betyg och meritvärden
                  </Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>{pageData.title}</h1>
          <p className="ingress">{pageData.description}</p>
        </BigDropHeader>
      </ContentBlock>

      {pageData.wysiwyg_content ?
        <ContentBlock classNameWrapper="!mt-0">
          <Wysiwyg content={pageData.wysiwyg_content} />
        </ContentBlock>
      : <></>}

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
      <SearchBlock show={pageData.showSearchBlock} />
    </DefaultLayout>
  );
}
