import { BooleanInput, useRecordContext, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { EditEmployerPromotionsBlock } from './employer-promotions-block.edit.component';
import { EditFAQBlock } from './faq-block.edit.component';
import { EditImportantDatesBlock } from './important-dates-block.edit.component';
import { EditLogosBlock } from './logos-block.edit.component';
import { EditMapBlock } from './map-block.edit.component';
import { EditPromotionsBlock } from './promotions-block.edit.component';
import { EditTableBlock } from './table-block.edit.component';
import { Wysiwyg } from './wysiwyig/wysiwyg.component';
import { EditContactFormBlock } from './contact-form-block.edit.component';

export const PageSwitch = () => {
  const record = useRecordContext();
  const url: string = record?.url || '';
  const translate = useTranslate();
  const { isAdmin } = useRoutePermissions();

  switch (url) {
    case '/login':
    case '/utbildningar/sok':
    case '/utbildningar/sok/jamfor':
      return <></>;
    case '/utbildningsanordnare':
      return (
        <>
          {(isAdmin || record.faqBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
        </>
      );
    case '/utbildningar/[utbildning]':
      return (
        <>
          {(isAdmin || record.faqBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
          {isAdmin && (
            <>
              <br />
              <h2>{translate('resources.educationsRelatedBlock.name')}</h2>
              <BooleanInput
                source="showEducationsRelatedBlock"
                label={translate('resources.educationsRelatedBlock.fields.showBlock')}
              />
            </>
          )}
          {isAdmin && (
            <>
              <br />
              <h2>{translate('resources.searchBlock.name')}</h2>
              <BooleanInput source="showSearchBlock" label={translate('resources.searchBlock.fields.showBlock')} />
            </>
          )}
        </>
      );
    case '/utbildningar/efterfragade/[efterfragad]':
      return (
        <>
          {(isAdmin || record.wysiwyg_content?.length) && (
            <>
              <Wysiwyg />
            </>
          )}
        </>
      );
    default:
      // StandardPage
      return (
        <>
          {(isAdmin || record.wysiwyg_content?.length) && (
            <>
              <Wysiwyg />
            </>
          )}
          {(isAdmin || record.tableBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.tableBlock.name', { smart_count: 2 })}</h2>
              <EditTableBlock />
            </>
          )}
          {(isAdmin || record.promotionsBlock?.length) && (
            <>
              <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
              <EditPromotionsBlock />
            </>
          )}
          {(isAdmin || record.mapBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.mapBlock.name', { smart_count: 2 })}</h2>
              <EditMapBlock />
            </>
          )}
          {(isAdmin || record.employerPromotionsBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.employerPromotionsBlock.name')}</h2>
              <EditEmployerPromotionsBlock />
            </>
          )}
          {isAdmin && (
            <>
              <br />
              <h2>{translate('resources.educationsStartingBlock.name')}</h2>
              <BooleanInput
                source="showEducationsStartingBlock"
                label={translate('resources.educationsStartingBlock.fields.showBlock')}
              />
            </>
          )}
          {(isAdmin || record.importantDatesBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.importantDatesBlock.name', { smart_count: 2 })}</h2>
              <EditImportantDatesBlock />
            </>
          )}
          {(isAdmin || record.faqBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
          {(isAdmin || record.contactFormBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.contactFormBlock.name')}</h2>
              <EditContactFormBlock />
            </>
          )}
          {isAdmin && (
            <>
              <br />
              <h2>{translate('resources.searchBlock.name')}</h2>
              <BooleanInput source="showSearchBlock" label={translate('resources.searchBlock.fields.showBlock')} />
            </>
          )}
          {(isAdmin || record.logosBlock?.length) && (
            <>
              <h2>{translate('resources.logosBlock.name', { smart_count: 2 })}</h2>
              <EditLogosBlock />
            </>
          )}
        </>
      );
  }
};
