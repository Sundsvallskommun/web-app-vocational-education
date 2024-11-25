import { ReferenceManyField, useRecordContext } from 'react-admin';
import { TableBlockList } from '../table-block/table-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditTableBlock = (props: any) => {
  const record = useRecordContext();

  return (
    <div>
      <ReferenceManyField source="pageId" reference="tableBlock" target="pageId">
        <TableBlockList
          filter={{ pageId: record.id }}
          pagination={false}
          actions={false}
          empty={<ListCreateButton />}
        />
      </ReferenceManyField>
    </div>
  );
};
