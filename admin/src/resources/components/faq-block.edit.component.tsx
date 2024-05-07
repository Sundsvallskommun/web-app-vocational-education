import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { FAQBlockList } from '../faq-block/faq-block.list.component';

export const EditFAQBlock = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="faqBlock">
        <FAQBlockList filter={{ pageName: record.pageName }} pagination={false} actions={false} />
      </ReferenceArrayField>
    </div>
  );
};
