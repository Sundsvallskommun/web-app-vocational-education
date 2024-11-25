import ContentBlock from '@components/block/content-block.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import TableBlock from '@components/table-block/table-block.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Breadcrumb } from '@sk-web-gui/react';
import { getStandardPageProps } from '@utils/page-types';
import NextLink from 'next/link';

export async function getServerSideProps(context) {
  return getStandardPageProps(context);
}

export const Utbildningsanordnare: React.FC = ({ pageData, layoutData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Arbetsgivare - Kontakta utbildningsanordnare`} layoutData={layoutData}>
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
                <NextLink href="/arbetsgivare" passHref legacyBehavior>
                  <Breadcrumb.Link href="/arbetsgivare">Arbetsgivare</Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <NextLink href="/arbetsgivare/kontaktautbildningsanordnare" passHref legacyBehavior>
                  <Breadcrumb.Link currentPage href="/arbetsgivare/kontaktautbildningsanordnare">
                    Kontakta utbildningsanordnare
                  </Breadcrumb.Link>
                </NextLink>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <h1>{pageData?.title}</h1>
          <p className="ingress">{pageData?.description}</p>
        </BigDropHeader>
      </ContentBlock>

      {pageData.tableBlock ?
        <ContentBlock>
          <TableBlock tableBlock={pageData?.tableBlock?.pop()} />
        </ContentBlock>
      : <></>}
    </DefaultLayout>
  );
};

export default Utbildningsanordnare;
