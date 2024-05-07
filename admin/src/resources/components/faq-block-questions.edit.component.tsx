import { ReferenceArrayField, useRecordContext } from 'react-admin';
import { FAQBlockQuestionsList } from '../faq-block-questions/faq-block-questions.list.component';

export const EditFAQBlockQuestions = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceArrayField source="pageName" reference="faqBlockQuestions">
        <FAQBlockQuestionsList filter={{ pageName: record.pageName }} pagination={false} />
      </ReferenceArrayField>
    </div>
  );
};
