import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { FAQBlockList } from '../faq-block/faq-block.list.component';
import { ListCreateButton } from './list-create-button.component';

export const EditFAQBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="faqBlock">
        <FAQBlockList
          filter={{ pageName: record.pageName }}
          pagination={false}
          actions={false}
          empty={<ListCreateButton />}
        />
      </ReferenceArrayField>
    </div>
  );
};
