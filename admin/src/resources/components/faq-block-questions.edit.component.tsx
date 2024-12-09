import { ReferenceManyField, useRecordContext } from 'react-admin';
import { FAQBlockQuestionsList } from '../faq-block-questions/faq-block-questions.list.component';

export const EditFAQBlockQuestions = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField target="blockId" filter={{ pageName: record.pageName }} reference="faqBlockQuestions">
        <FAQBlockQuestionsList filter={{ pageName: record.pageName }} pagination={false} />
      </ReferenceManyField>
    </div>
  );
};
