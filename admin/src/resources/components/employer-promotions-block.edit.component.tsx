import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { EmployerPromotionsBlockList } from '../employer-promotions-block/employer-promotions-block.list.component';

export const EditEmployerPromotionsBlock = () => {
  return (
    <div>
      <ReferenceArrayField source="title" reference="employerPromotionsBlock">
        <EmployerPromotionsBlockList pagination={false} actions={false} />
      </ReferenceArrayField>
    </div>
  );
};
