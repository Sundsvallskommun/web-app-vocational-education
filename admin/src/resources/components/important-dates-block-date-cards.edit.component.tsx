import { ReferenceManyField, useRecordContext } from 'react-admin';
import { ImportantDatesBlockDateCardsList } from '../important-dates-block-date-cards/important-dates-block-date-cards.list.component';

interface EditImportantDatesBlockDateCardsProps {
  filterPageName?: string;
}

export const EditImportantDatesBlockDateCards = ({ filterPageName }: EditImportantDatesBlockDateCardsProps) => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField
        target="blockId"
        filter={{ pageName: filterPageName ?? record.pageName }}
        reference="importantDatesBlockDateCards"
      >
        <ImportantDatesBlockDateCardsList filter={{ pageName: filterPageName ?? record.pageName }} pagination={false} />
      </ReferenceManyField>
    </div>
  );
};
