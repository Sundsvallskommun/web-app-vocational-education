import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { PromotionsBlockList } from '../promotions-block/promotions-block.list.component';

export const EditPromotionsBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="promotionsBlock">
        <PromotionsBlockList filter={{ pageName: record.pageName }} pagination={false} actions={false} />
      </ReferenceArrayField>
    </div>
  );
};
