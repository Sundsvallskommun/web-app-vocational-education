import ContentBlock from '@components/block/content-block.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import EducationManagerContactTable from '@components/utbildningsanordnare/contact-table.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import { Breadcrumb } from '@sk-web-gui/react';
import _ from 'lodash';
import NextLink from 'next/link';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  const pageProps = await getPage('/arbetsgivare/kontaktautbildningsanordnare', res);
  return await _.merge(layoutProps, pageProps);
}

export const Utbildningsanordnare: React.FC = ({ pageData, layoutData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Arbetsgivare - Kontakta utbildningsanordnare`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc="/drop-person-holding-thing.png"
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

      <ContentBlock>
        <EducationManagerContactTable tableBlock={pageData?.tableBlock?.pop()} />
      </ContentBlock>
    </DefaultLayout>
  );
};

export default Utbildningsanordnare;
