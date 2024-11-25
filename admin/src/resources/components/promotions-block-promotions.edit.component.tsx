import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { PromotionsBlockPromotionsList } from '../promotions-block-promotions/promotions-block-promotions.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditPromotionsBlockPromotions = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="promotionsBlockPromotions">
        <PromotionsBlockPromotionsList
          filter={{ pageName: record.pageName }}
          pagination={false}
          empty={<ListCreateButton />}
        />
      </ReferenceArrayField>
    </div>
  );
};
