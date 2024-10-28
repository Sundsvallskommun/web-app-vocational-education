import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { LogosBlockList } from '../logos-block/logos-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditLogosBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="logosBlock">
        <LogosBlockList
          filter={{ pageName: record.pageName }}
          pagination={false}
          actions={false}
          empty={<ListCreateButton />}
        />
      </ReferenceArrayField>
    </div>
  );
};
