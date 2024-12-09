import { useRecordContext } from 'react-admin';
import { ImportantDatesBlockDateCardsList } from '../important-dates-block-date-cards/important-dates-block-date-cards.list.component';

interface EditImportantDatesBlockDateCardsProps {
  filterPageName?: string;
}

export const EditImportantDatesBlockDateCards = ({ filterPageName }: EditImportantDatesBlockDateCardsProps) => {
  const record = useRecordContext();
  return (
    <ImportantDatesBlockDateCardsList
      resource="importantDatesBlockDateCards"
      filter={{ pageName: filterPageName ?? record.pageName }}
      pagination={false}
    />
  );
};
