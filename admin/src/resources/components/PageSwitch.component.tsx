import { BooleanInput, TextInput, useInput, useRecordContext, useTranslate } from 'react-admin';
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
import { BlockType } from '../../interfaces/database-models';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const RenderBlock = ({ blockType }: { blockType: BlockType }) => {
  const record = useRecordContext();
  const translate = useTranslate();
  const { isAdmin } = useRoutePermissions();
  switch (blockType) {
    case 'wysiwyg_content':
      return (
        <>
          {(isAdmin || record.wysiwyg_content?.length) && (
            <div>
              <Wysiwyg />
            </div>
          )}
        </>
      );
    case 'tableBlock':
      return (
        <>
          {(isAdmin || record.tableBlock?.length) && (
            <div>
              <h2>{translate('resources.tableBlock.name', { smart_count: 2 })}</h2>
              <EditTableBlock />
            </div>
          )}
        </>
      );
    case 'promotionsBlock':
      return (
        <>
          {(isAdmin || record.promotionsBlock?.length) && (
            <div>
              <h2>{translate('resources.promotionsBlock.name', { smart_count: 2 })}</h2>
              <EditPromotionsBlock />
            </div>
          )}
        </>
      );
    case 'mapBlock':
      return (
        <>
          {(isAdmin || record.mapBlock?.length) && (
            <div>
              <h2>{translate('resources.mapBlock.name', { smart_count: 2 })}</h2>
              <EditMapBlock />
            </div>
          )}
        </>
      );
    case 'employerPromotionsBlock':
      return (
        <>
          {(isAdmin || record.employerPromotionsBlock?.length) && (
            <div>
              <h2>{translate('resources.employerPromotionsBlock.name')}</h2>
              <EditEmployerPromotionsBlock />
            </div>
          )}
        </>
      );
    case 'educationsStartingBlock':
      return (
        <>
          {isAdmin && (
            <div>
              <h2>{translate('resources.educationsStartingBlock.name')}</h2>
              <BooleanInput
                source="showEducationsStartingBlock"
                label={translate('resources.educationsStartingBlock.fields.showBlock')}
              />
            </div>
          )}
        </>
      );
    case 'importantDatesBlock':
      return (
        <>
          {(isAdmin || record.importantDatesBlock?.length) && (
            <div>
              <h2>{translate('resources.importantDatesBlock.name', { smart_count: 2 })}</h2>
              <EditImportantDatesBlock />
            </div>
          )}
        </>
      );
    case 'faqBlock':
      return (
        <>
          {(isAdmin || record.faqBlock?.length) && (
            <div>
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </div>
          )}
        </>
      );
    case 'contactFormBlock':
      return (
        <>
          {(isAdmin || record.contactFormBlock?.length) && (
            <div>
              <h2>{translate('resources.contactFormBlock.name')}</h2>
              <EditContactFormBlock />
            </div>
          )}
        </>
      );
    case 'searchBlock':
      return (
        <>
          {isAdmin && (
            <div>
              <h2>{translate('resources.searchBlock.name')}</h2>
              <BooleanInput source="showSearchBlock" label={translate('resources.searchBlock.fields.showBlock')} />
            </div>
          )}
        </>
      );
    case 'logosBlock':
      return (
        <>
          {(isAdmin || record.logosBlock?.length) && (
            <div>
              <h2>{translate('resources.logosBlock.name', { smart_count: 2 })}</h2>
              <EditLogosBlock />
            </div>
          )}
        </>
      );
    default:
      <></>;
  }
};

const StandardPageBlockOrder = () => {
  const record = useRecordContext();
  const [order, setOrder] = useState<BlockType[]>(record.blockOrder.split(',') ?? []);
  const { field } = useInput({ source: 'blockOrder' });

  const handleMove = (index: number, direction: number) => () => {
    setOrder((order) => {
      const newOrder = [...order]; // Create a copy of the array
      const targetIndex = index + direction;

      // Ensure the targetIndex is within bounds
      if (targetIndex >= 0 && targetIndex < newOrder.length) {
        // Swap the items
        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
      }

      return newOrder;
    });
  };

  useEffect(() => {
    field.onChange(order.join(',')); // Update form state when order changes
  }, [order, field]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        gap: '1rem',
      }}
    >
      <TextInput style={{ display: 'none' }} source="blockOrder" type="hidden" value={order.join(',')} />
      {order.map((blockType: BlockType, i: number) => (
        <div
          key={`${i}`}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            gap: '1rem',
            width: '100%',
            padding: '.5rem',
            backgroundColor: 'rgba(0,0,0,.03)',
            borderRadius: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <div>
              <IconButton onClick={handleMove(i, -1)} aria-label="Flytta upp">
                <ArrowDropUpIcon />
              </IconButton>
            </div>
            <div>
              <IconButton onClick={handleMove(i, 1)} aria-label="Flytta ned">
                <ArrowDropDownIcon />
              </IconButton>
            </div>
          </div>
          <div>
            <RenderBlock blockType={blockType} />
          </div>
        </div>
      ))}
    </div>
  );
};

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
            <div>
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </div>
          )}
        </>
      );
    case '/utbildningar/[utbildning]':
      return (
        <>
          {(isAdmin || record.faqBlock?.length) && (
            <div>
              <h2>{translate('resources.faqBlock.name', { smart_count: 2 })}</h2>
              <EditFAQBlock />
            </div>
          )}
          {isAdmin && (
            <div>
              <h2>{translate('resources.educationsRelatedBlock.name')}</h2>
              <BooleanInput
                source="showEducationsRelatedBlock"
                label={translate('resources.educationsRelatedBlock.fields.showBlock')}
              />
            </div>
          )}
          {isAdmin && (
            <div>
              <h2>{translate('resources.searchBlock.name')}</h2>
              <BooleanInput source="showSearchBlock" label={translate('resources.searchBlock.fields.showBlock')} />
            </div>
          )}
        </>
      );
    case '/utbildningar/efterfragade/[efterfragad]':
      return (
        <>
          {(isAdmin || record.wysiwyg_content?.length) && (
            <div>
              <Wysiwyg />
            </div>
          )}
        </>
      );
    default:
      // StandardPage
      return <StandardPageBlockOrder />;
  }
};
