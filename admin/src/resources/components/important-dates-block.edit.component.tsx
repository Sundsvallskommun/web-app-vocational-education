import { ReferenceManyField, useRecordContext } from 'react-admin';
import { ImportantDatesBlockList } from '../important-dates-block/important-dates-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditImportantDatesBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField target="pageName" filter={{ pageName: record.pageName }} reference="importantDatesBlock">
        <ImportantDatesBlockList
          filter={{ pageName: record.pageName }}
          pagination={false}
          actions={false}
          empty={<ListCreateButton />}
        />
      </ReferenceManyField>
    </div>
  );
};
