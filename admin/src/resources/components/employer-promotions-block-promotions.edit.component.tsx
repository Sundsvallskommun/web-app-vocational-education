import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { EmployerPromotionsBlockPromotionsList } from '../employer-promotions-block-promotions/employer-promotions-block-promotions.list.component';

export const EditEmployerPromotionsBlockPromotions = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="employerPromotionsBlockPromotions">
        <EmployerPromotionsBlockPromotionsList filter={{ pageName: record.pageName }} pagination={false} />
      </ReferenceArrayField>
    </div>
  );
};
