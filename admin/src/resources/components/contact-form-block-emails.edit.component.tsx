import { useRecordContext } from 'react-admin';
import { ContactFormBlockEmailsList } from '../contact-form-block-emails/contact-form-block-emails.list.component';

export const EditContactFormBlockEmails = () => {
  const record = useRecordContext();
  return (
    <div>
      <ContactFormBlockEmailsList
        filter={{ pageId: record.pageId }}
        pagination={false}
        resource="contactFormBlockEmails"
      />
    </div>
  );
};
