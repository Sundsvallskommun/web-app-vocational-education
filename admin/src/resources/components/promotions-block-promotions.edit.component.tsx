import { ReferenceManyField, useRecordContext } from 'react-admin';
import { PromotionsBlockPromotionsList } from '../promotions-block-promotions/promotions-block-promotions.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditPromotionsBlockPromotions = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField target="blockId" filter={{ pageName: record.pageName }} reference="promotionsBlockPromotions">
        <PromotionsBlockPromotionsList
          filter={{ pageName: record.pageName }}
          pagination={false}
          empty={<ListCreateButton />}
        />
      </ReferenceManyField>
    </div>
  );
};
