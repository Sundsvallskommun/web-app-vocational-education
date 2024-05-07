import { ReferenceManyField, useRecordContext } from 'react-admin';
import { TableBlockList } from '../table-block/table-block.list.component';

export const EditTableBlock = (props: any) => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField source="pageId" reference="tableBlock" target="pageId">
        <TableBlockList filter={{ pageId: record.pageId }} pagination={false} actions={false} />
      </ReferenceManyField>
    </div>
  );
};
