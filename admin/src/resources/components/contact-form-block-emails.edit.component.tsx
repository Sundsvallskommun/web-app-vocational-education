import { ReferenceManyField, useRecordContext } from 'react-admin';
import { ContactFormBlockEmailsList } from '../contact-form-block-emails/contact-form-block-emails.list.component';

export const EditContactFormBlockEmails = () => {
  const record = useRecordContext();
  return (
    <div>
      <ReferenceManyField target="formId" filter={{ pageId: record.pageId }} reference="contactFormBlockEmails">
        <ContactFormBlockEmailsList filter={{ pageId: record.pageId }} pagination={false} />
      </ReferenceManyField>
    </div>
  );
};
