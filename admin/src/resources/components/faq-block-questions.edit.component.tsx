import { useRecordContext } from 'react-admin';
import { FAQBlockQuestionsList } from '../faq-block-questions/faq-block-questions.list.component';

export const EditFAQBlockQuestions = () => {
  const record = useRecordContext();
  return (
    <FAQBlockQuestionsList filter={{ pageName: record.pageName }} pagination={false} resource="faqBlockQuestions" />
  );
};
