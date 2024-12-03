import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import Search from '@components/search/search.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { cx } from '@sk-web-gui/react';

export default function Page({ layoutData, pageData, children }: PageProps & { children: React.ReactElement }) {
  return (
    <DefaultLayout title={`Yrkesutbildning - ${pageData?.title}`} layoutData={layoutData}>
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
          <h1>{pageData?.title}</h1>
          {pageData?.description ?
            <p className="ingress">{pageData?.description}</p>
          : <></>}
          {pageData?.showSearchBar ?
            <Search />
          : null}
        </BigDropHeader>
      </ContentBlock>

      {children}
    </DefaultLayout>
  );
}
