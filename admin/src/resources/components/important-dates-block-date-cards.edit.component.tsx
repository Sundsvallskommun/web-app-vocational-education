import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { ImportantDatesBlockDateCardsList } from '../important-dates-block-date-cards/important-dates-block-date-cards.list.component';

export const EditImportantDatesBlockDateCards = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="importantDatesBlockDateCards">
        <ImportantDatesBlockDateCardsList filter={{ pageName: record.pageName }} pagination={false} />
      </ReferenceArrayField>
    </div>
  );
};
