import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { EmployerPromotionsBlockPromotionsList } from '../employer-promotions-block-promotions/employer-promotions-block-promotions.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditEmployerPromotionsBlockPromotions = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="title" reference="employerPromotionsBlockPromotions">
        <EmployerPromotionsBlockPromotionsList pagination={false} actions={<ListCreateButton />} />
      </ReferenceArrayField>
    </div>
  );
};
