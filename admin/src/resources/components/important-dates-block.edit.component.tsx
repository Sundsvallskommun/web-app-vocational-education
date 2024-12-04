import { useRecordContext } from 'react-admin';
import { ImportantDatesBlockList } from '../important-dates-block/important-dates-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditImportantDatesBlock = () => {
  const record = useRecordContext();
  return (
    <ImportantDatesBlockList
      resource="importantDatesBlock"
      filter={{ pageName: record.pageName }}
      pagination={false}
      actions={false}
      empty={<ListCreateButton />}
    />
  );
};
