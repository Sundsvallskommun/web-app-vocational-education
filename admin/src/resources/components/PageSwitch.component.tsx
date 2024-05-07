import { useRecordContext, useTranslate } from 'react-admin';
import { EditEmployerPromotionsBlock } from './employer-promotions-block.edit.component';
import { EditFAQBlock } from './faq-block.edit.component';
import { EditImportantDatesBlock } from './important-dates-block.edit.component';
import { EditLogosBlock } from './logos-block.edit.component';
import { EditMapBlock } from './map-block.edit.component';
import { EditPromotionsBlock } from './promotions-block.edit.component';
import { EditTableBlock } from './table-block.edit.component';

export const PageSwitch = () => {
  const record = useRecordContext();
  const pageName: string = record?.pageName || '';
  const translate = useTranslate();
  switch (pageName) {
    case 'startsida':
      return (
        <>
          <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
          <EditPromotionsBlock />
          <br />
          <h2>{translate('resources.mapBlock.name', { smart_count: 2 })}</h2>
          <EditMapBlock />
          <br />
          <h2>{translate('resources.employerPromotionsBlock.name', { smart_count: 2 })}</h2>
          <EditEmployerPromotionsBlock />
          <br />
          <h2>{translate('resources.importantDatesBlock.name', { smart_count: 2 })}</h2>
          <EditImportantDatesBlock />
          <br />
          <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
          <EditFAQBlock />
          <br />
          <h2>{translate('resources.logosBlock.name', { smart_count: 2 })}</h2>
          <EditLogosBlock />
        </>
      );
    case 'utbildningar':
      return (
        <>
          <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
          <EditPromotionsBlock />
          <br />
          <h2>{translate('resources.employerPromotionsBlock.name', { smart_count: 2 })}</h2>
          <EditEmployerPromotionsBlock />
          <br />
          <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
          <EditFAQBlock />
        </>
      );
    case 'utbildningsanordnare_kontakta':
      return (
        <>
          <h2>{translate('resources.tableBlock.name', { smart_count: 2 })}</h2>
          <EditTableBlock />
        </>
      );
    default:
      return <></>;
  }
};
