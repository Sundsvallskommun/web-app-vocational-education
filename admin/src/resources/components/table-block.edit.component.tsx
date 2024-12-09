import { useRecordContext } from 'react-admin';
import { TableBlockList } from '../table-block/table-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditTableBlock = (props: any) => {
  const record = useRecordContext();

  return (
    <TableBlockList
      filter={{ pageId: record.id }}
      pagination={false}
      actions={false}
      empty={<ListCreateButton />}
      resource="tableBlock"
    />
  );
};
