import ContentBlock from '@components/block/content-block.component';
import ContactFormLogic from '@components/contact-form/contact-form-logic.component';
import ContactFormWrapper from '@components/contact-form/contact-form-wrapper.component';
import ContactForm from '@components/contact-form/contact-form.component';
import { ContactFormBlock as IContactFormBlock } from '@interfaces/admin-data';

export default function ContactFormBlock({ contactFormBlock }: { contactFormBlock?: IContactFormBlock }) {
  if (!contactFormBlock) return null;
  return (
    <ContentBlock>
      <ContactFormLogic>
        <ContactFormWrapper>
          <ContactForm municipalityEmails={contactFormBlock.emails} />
        </ContactFormWrapper>
      </ContactFormLogic>
    </ContentBlock>
  );
}
