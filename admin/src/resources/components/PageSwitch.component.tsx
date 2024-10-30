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
  const { isSuperAdmin } = useRoutePermissions();

  switch (url) {
    case '/':
      return (
        <>
          {(isSuperAdmin || record.promotionsBlock?.length) && (
            <>
              <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
              <EditPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.mapBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.mapBlock.name', { smart_count: 2 })}</h2>
              <EditMapBlock />
            </>
          )}
          {(isSuperAdmin || record.employerPromotionsBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.employerPromotionsBlock.name')}</h2>
              <EditEmployerPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.importantDatesBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.importantDatesBlock.name', { smart_count: 2 })}</h2>
              <EditImportantDatesBlock />
            </>
          )}
          {(isSuperAdmin || record.faqBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
          {(isSuperAdmin || record.logosBlock?.length) && (
            <>
              <h2>{translate('resources.logosBlock.name', { smart_count: 2 })}</h2>
              <EditLogosBlock />
            </>
          )}
        </>
      );
    case '/utbildningar':
      return (
        <>
          {(isSuperAdmin || record.promotionsBlock?.length) && (
            <>
              <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
              <EditPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.employerPromotionsBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.employerPromotionsBlock.name')}</h2>
              <EditEmployerPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.faqBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
        </>
      );
    case '/arbetsgivare/kontaktautbildningsanordnare':
      return (
        <>
          {(isSuperAdmin || record.wysiwyg_content?.length) && (
            <>
              <Wysiwyg />
            </>
          )}
          {(isSuperAdmin || record.tableBlock?.length) && (
            <>
              <h2>{translate('resources.tableBlock.name', { smart_count: 2 })}</h2>
              <EditTableBlock />
            </>
          )}
        </>
      );
    case '/utbildningar/[utbildning]':
      return (
        <>
          {(isSuperAdmin || record.faqBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
          {isSuperAdmin && (
            <>
              <br />
              <h2>{translate('resources.educationsRelatedBlock.name')}</h2>
              <BooleanInput
                source="showEducationsRelatedBlock"
                label={translate('resources.educationsRelatedBlock.fields.showBlock')}
              />
            </>
          )}
          {isSuperAdmin && (
            <>
              <br />
              <h2>{translate('resources.searchBlock.name')}</h2>
              <BooleanInput source="showSearchBlock" label={translate('resources.searchBlock.fields.showBlock')} />
            </>
          )}
        </>
      );
    default:
      // StandardPage
      return (
        <>
          {(isSuperAdmin || record.wysiwyg_content?.length) && (
            <>
              <Wysiwyg />
            </>
          )}
          {(isSuperAdmin || record.tableBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.tableBlock.name', { smart_count: 2 })}</h2>
              <EditTableBlock />
            </>
          )}
          {(isSuperAdmin || record.promotionsBlock?.length) && (
            <>
              <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
              <EditPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.mapBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.mapBlock.name', { smart_count: 2 })}</h2>
              <EditMapBlock />
            </>
          )}
          {(isSuperAdmin || record.employerPromotionsBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.employerPromotionsBlock.name')}</h2>
              <EditEmployerPromotionsBlock />
            </>
          )}
          {isSuperAdmin && (
            <>
              <br />
              <h2>{translate('resources.educationsRelatedBlock.name')}</h2>
              <BooleanInput
                source="showEducationsRelatedBlock"
                label={translate('resources.educationsRelatedBlock.fields.showBlock')}
              />
            </>
          )}
          {(isSuperAdmin || record.importantDatesBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.importantDatesBlock.name', { smart_count: 2 })}</h2>
              <EditImportantDatesBlock />
            </>
          )}
          {(isSuperAdmin || record.faqBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
          {(isSuperAdmin || record.contactFormBlock?.length) && (
            <>
              <br />
              <h2>{translate('resources.contactFormBlock.name')}</h2>
              <EditContactFormBlock />
            </>
          )}
          {isSuperAdmin && (
            <>
              <br />
              <h2>{translate('resources.searchBlock.name')}</h2>
              <BooleanInput source="showSearchBlock" label={translate('resources.searchBlock.fields.showBlock')} />
            </>
          )}
          {(isSuperAdmin || record.logosBlock?.length) && (
            <>
              <h2>{translate('resources.logosBlock.name', { smart_count: 2 })}</h2>
              <EditLogosBlock />
            </>
          )}
        </>
      );
  }
};
