import { ReferenceManyField, useRecordContext } from 'react-admin';
import { PromotionsBlockList } from '../promotions-block/promotions-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditPromotionsBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField target="pageName" filter={{ pageName: record.pageName }} reference="promotionsBlock">
        <PromotionsBlockList
          filter={{ pageName: record.pageName }}
          pagination={false}
          actions={false}
          empty={<ListCreateButton />}
        />
      </ReferenceManyField>
    </div>
  );
};
