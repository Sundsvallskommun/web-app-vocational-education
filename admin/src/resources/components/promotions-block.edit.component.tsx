import { useRecordContext } from 'react-admin';
import { PromotionsBlockList } from '../promotions-block/promotions-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditPromotionsBlock = () => {
  const record = useRecordContext();
  return (
    <PromotionsBlockList
      filter={{ pageName: record.pageName }}
      pagination={false}
      actions={false}
      empty={<ListCreateButton />}
      resource="promotionsBlock"
    />
  );
};
