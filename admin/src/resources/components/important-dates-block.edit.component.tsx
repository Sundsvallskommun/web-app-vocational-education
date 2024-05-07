import { ReferenceArrayField, TextInput, useRecordContext } from 'react-admin';
import { ImportantDatesBlockList } from '../important-dates-block/important-dates-block.list.component';

export const EditImportantDatesBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="importantDatesBlock">
        <ImportantDatesBlockList filter={{ pageName: record.pageName }} pagination={false} actions={false} />
      </ReferenceArrayField>
    </div>
  );
};
