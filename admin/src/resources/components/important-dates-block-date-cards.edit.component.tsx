import { useRecordContext } from 'react-admin';
import { Link } from 'react-router-dom';
import { ImportantDatesBlockDateCardsList } from '../important-dates-block-date-cards/important-dates-block-date-cards.list.component';

interface EditImportantDatesBlockDateCardsProps {
  filterPageName?: string;
  referencedBlockId?: number;
}

export const EditImportantDatesBlockDateCards = ({
  filterPageName,
  referencedBlockId,
}: EditImportantDatesBlockDateCardsProps) => {
  const record = useRecordContext();

  if (filterPageName !== record.pageName) {
    return (
      <>
        <Link to={`/importantDatesBlock/${referencedBlockId}`}>Gå till block: {filterPageName}</Link>
      </>
    );
  } else {
    return (
      <ImportantDatesBlockDateCardsList
        resource="importantDatesBlockDateCards"
        filter={{ pageName: record.pageName }}
        pagination={false}
      />
    );
  }
};
