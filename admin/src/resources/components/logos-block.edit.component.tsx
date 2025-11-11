import { useRecordContext } from 'react-admin';
import { LogosBlockList } from '../logos-block/logos-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditLogosBlock = () => {
  const record = useRecordContext();
  return (
    <LogosBlockList
      pagination={false}
      filter={{ pageName: record.pageName }}
      actions={false}
      empty={<ListCreateButton />}
      resource="logosBlock"
    />
  );
};
