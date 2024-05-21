import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import theme from './Theme';
import { authProvider } from './providers/authProvider';
import { dataProvider } from './providers/dataProvider';
import { i18nProvider } from './providers/i18nProvider';

// Resources
import { EmployerPromotionsBlockPromotionsCreate } from './resources/employer-promotions-block-promotions/employer-promotions-block-promotions.create.component';
import { EmployerPromotionsBlockPromotionsEdit } from './resources/employer-promotions-block-promotions/employer-promotions-block-promotions.edit.component';
import { EmployerPromotionsBlockEdit } from './resources/employer-promotions-block/employer-promotions-block.edit.component';
import { FAQBlockQuestionsCreate } from './resources/faq-block-questions/faq-block-questions.create.component';
import { FAQBlockQuestionsEdit } from './resources/faq-block-questions/faq-block-questions.edit.component';
import { FAQBlockEdit } from './resources/faq-block/faq-block.edit.component';
import { FooterEdit } from './resources/footer/footer.edit.component';
import { ImportantDatesBlockDateCardsCreate } from './resources/important-dates-block-date-cards/important-dates-block-date-cards.create.component';
import { ImportantDatesBlockDateCardsEdit } from './resources/important-dates-block-date-cards/important-dates-block-date-cards.edit.component';
import { ImportantDatesBlockEdit } from './resources/important-dates-block/important-dates-block.edit.component';
import { LogosBlockLogosCreate } from './resources/logos-block-logos/logos-block-logos.create.component';
import { LogosBlockLogosEdit } from './resources/logos-block-logos/logos-block-logos.edit.component';
import { LogosBlockEdit } from './resources/logos-block/logos-block.edit.component';
import { MapBlockEdit } from './resources/map-block/map-block.edit.component';
import { PageEdit } from './resources/page/page.edit.component';
import { PageList } from './resources/page/page.list.component';
import { PromotionsBlockPromotionsEdit } from './resources/promotions-block-promotions/promotions-block-promotions.edit.component';
import { PromotionsBlockEdit } from './resources/promotions-block/promotions-block.edit.component';
import { UserCreate } from './resources/user/user.create.component';
import { UserEdit } from './resources/user/user.edit.component';
import { UserList } from './resources/user/user.list.component';
import { PageCreate } from './resources/page/page.create.component';
import { TableBlockCreate } from './resources/table-block/table-block.create.component';
import { TableBlockEdit } from './resources/table-block/table-block.edit.component';
import { TableBlockList } from './resources/table-block/table-block.list.component';

export const App = () => (
  <Admin
    title="Admin Yrkesutbildning Mitt"
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={false}
    i18nProvider={i18nProvider}
    disableTelemetry={true}
    theme={theme}
  >
    <Resource name="user" edit={UserEdit} create={UserCreate} list={UserList} />

    <Resource name="page" list={PageList} edit={PageEdit} create={PageCreate} />

    <Resource name="promotionsBlock" edit={PromotionsBlockEdit} />
    <Resource name="promotionsBlockPromotions" edit={PromotionsBlockPromotionsEdit} />
    <Resource name="mapBlock" edit={MapBlockEdit} />
    <Resource name="employerPromotionsBlock" edit={EmployerPromotionsBlockEdit} />
    <Resource
      name="employerPromotionsBlockPromotions"
      edit={EmployerPromotionsBlockPromotionsEdit}
      create={EmployerPromotionsBlockPromotionsCreate}
    />
    <Resource name="importantDatesBlock" edit={ImportantDatesBlockEdit} />
    <Resource
      name="importantDatesBlockDateCards"
      edit={ImportantDatesBlockDateCardsEdit}
      create={ImportantDatesBlockDateCardsCreate}
    />

    <Resource name="faqBlock" edit={FAQBlockEdit} />
    <Resource name="faqBlockQuestions" edit={FAQBlockQuestionsEdit} create={FAQBlockQuestionsCreate} />
    <Resource name="logosBlock" edit={LogosBlockEdit} />
    <Resource name="logosBlockLogos" edit={LogosBlockLogosEdit} create={LogosBlockLogosCreate} />

    <CustomRoutes>
      <Route path="/tableBlock" element={<TableBlockList />} />
      <Route path="/tableBlock/:tableId" element={<TableBlockEdit />} />
      <Route path="/tableBlock/create" element={<TableBlockCreate />} />
    </CustomRoutes>

    <Resource name="footer" edit={FooterEdit} />
  </Admin>
);
