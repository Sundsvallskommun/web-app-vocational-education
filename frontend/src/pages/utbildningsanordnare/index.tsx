import ContentBlock from '@components/block/content-block.component';
import FAQBlock from '@components/faq-block/faq-block';
import { BigDropHeader } from '@components/header/big-drop-header.component';
import SavedInterestsFormLogic from '@components/saved-interests/saved-interests-form-logic.component';
import SavedInterestsForm from '@components/saved-interests/saved-interests-form.component';
import SavedInterests from '@components/saved-interests/saved-interests.component';
import SavedSearches from '@components/saved-searches/saved-searches.component';
import { Search } from '@components/search/search.component';
import { PageProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { getLayout } from '@services/layout-service';
import { getPage } from '@services/page-service';
import _ from 'lodash';

export async function getServerSideProps({ res }) {
  const layoutProps = await getLayout(res);
  const pageProps = await getPage('/utbildningsanordnare', res);
  return await _.merge(layoutProps, pageProps);
}

export const Utbildningsanordnare: React.FC = ({ pageData, layoutData }: PageProps) => {
  return (
    <DefaultLayout title={`Yrkesutbildning - Utbildningsanordnare`} layoutData={layoutData}>
      <ContentBlock>
        <BigDropHeader
          imageSrc="/drop-person-holding-thing.png"
          imageAlt="Två studenter skrattar"
          imageDivClassName="hidden lg:block"
        >
          <h1>{pageData.title}</h1>
          <p className="ingress">{pageData.description}</p>
          <Search />
        </BigDropHeader>
      </ContentBlock>

      <ContentBlock>
        <div className="grid lg:grid-cols-[auto_50rem] gap-[5.6rem]">
          <div className="flex flex-col">
            <h2>Lägg till intresseområden</h2>
            <SavedInterestsFormLogic>
              <SavedInterestsForm />
            </SavedInterestsFormLogic>
            <SavedInterests />
          </div>
          <div className="flex flex-col">
            <h2>Mina sparade sökningar</h2>
            <SavedSearches />
          </div>
        </div>
      </ContentBlock>

      <FAQBlock faqBlock={pageData.faqBlock?.pop()} />
    </DefaultLayout>
  );
};

export default Utbildningsanordnare;
