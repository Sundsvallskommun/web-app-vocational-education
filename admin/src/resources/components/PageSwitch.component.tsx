import { useRecordContext, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { EditEmployerPromotionsBlock } from './employer-promotions-block.edit.component';
import { EditFAQBlock } from './faq-block.edit.component';
import { EditImportantDatesBlock } from './important-dates-block.edit.component';
import { EditLogosBlock } from './logos-block.edit.component';
import { EditMapBlock } from './map-block.edit.component';
import { EditPromotionsBlock } from './promotions-block.edit.component';
import { EditTableBlock } from './table-block.edit.component';
import { Wysiwyg } from './wysiwyig/wysiwyg.component';

export const PageSwitch = () => {
  const record = useRecordContext();
  const url: string = record?.url || '';
  const translate = useTranslate();
  const { isSuperAdmin } = useRoutePermissions();

  switch (url) {
    case '/':
      return (
        <>
          {(isSuperAdmin || record.promotionsBlock.length) && (
            <>
              <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
              <EditPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.mapBlock.length) && (
            <>
              <br />
              <h2>{translate('resources.mapBlock.name', { smart_count: 2 })}</h2>
              <EditMapBlock />
            </>
          )}
          {(isSuperAdmin || record.employerPromotionsBlock.length) && (
            <>
              <br />
              <h2>{translate('resources.employerPromotionsBlock.name', { smart_count: 2 })}</h2>
              <EditEmployerPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.importantDatesBlock.length) && (
            <>
              <br />
              <h2>{translate('resources.importantDatesBlock.name', { smart_count: 2 })}</h2>
              <EditImportantDatesBlock />
            </>
          )}
          {(isSuperAdmin || record.faqBlock.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
        </>
      );
    case '/utbildningar':
      return (
        <>
          {(isSuperAdmin || record.promotionsBlock.length) && (
            <>
              <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
              <EditPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.employerPromotionsBlock.length) && (
            <>
              <br />
              <h2>{translate('resources.employerPromotionsBlock.name', { smart_count: 2 })}</h2>
              <EditEmployerPromotionsBlock />
            </>
          )}
          {(isSuperAdmin || record.faqBlock.length) && (
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
          {(isSuperAdmin || record.tableBlock.length) && (
            <>
              <Wysiwyg />
            </>
          )}
          {(isSuperAdmin || record.tableBlock.length) && (
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
          {(isSuperAdmin || record.faqBlock.length) && (
            <>
              <br />
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </>
          )}
        </>
      );
    // StandardPages
    case '/utbildningar/behorighet':
    case '/utbildningar/vagledning':
      return (
        <>
          {(isSuperAdmin || record.tableBlock.length) && (
            <>
              <Wysiwyg />
            </>
          )}
        </>
      );
    default:
      return <></>;
  }
};
