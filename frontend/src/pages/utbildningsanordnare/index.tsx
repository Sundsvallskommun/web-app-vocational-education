import ContentBlock from '@components/block/content-block.component';
import Breadcrumbs from '@components/breadcrumbs/breadcrumbs.component';
import FAQBlock from '@components/faq-block/faq-block';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import SavedInterestsFormLogic from '@components/saved-interests/saved-interests-form-logic.component';
import SavedInterestsForm from '@components/saved-interests/saved-interests-form.component';
import SavedInterests from '@components/saved-interests/saved-interests.component';
import SavedSearches from '@components/saved-searches/saved-searches.component';
import { Search } from '@components/search/search.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { cx } from '@sk-web-gui/react';
import { getBlockData, getStandardPageProps } from '@utils/page-types';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getStandardPageProps(context);
}

export const Utbildningsanordnare = ({ pageData, layoutData }: PageProps) => {
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
          <h1>{pageData.title}</h1>
          {pageData.description ?
            <p className="ingress">{pageData.description}</p>
          : <></>}
          <Search />
        </BigDropHeader>
      </ContentBlock>

      <ContentBlock>
        <div className="grid desktop:grid-cols-[auto_50rem] gap-y-lg gap-x-[5.6rem]">
          <div className="flex flex-col">
            <h2>Lägg till intresseområden</h2>
            <SavedInterestsFormLogic>
              <SavedInterestsForm />
            </SavedInterestsFormLogic>
            <SavedInterests />
          </div>
          <div className="flex flex-col">
            <SavedSearches />
          </div>
        </div>
      </ContentBlock>

      <FAQBlock faqBlock={getBlockData(pageData?.faqBlock)} />
    </DefaultLayout>
  );
};

export default Utbildningsanordnare;
