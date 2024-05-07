import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { PromotionsBlockPromotionsList } from '../promotions-block-promotions/promotions-block-promotions.list.component';

export const EditPromotionsBlockPromotions = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="promotionsBlockPromotions">
        <PromotionsBlockPromotionsList filter={{ pageName: record.pageName }} pagination={false} actions={false} />
      </ReferenceArrayField>
    </div>
  );
};
