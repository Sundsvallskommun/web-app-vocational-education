import Button from '@components/button/button.component';
import ErrorMessage from '@components/error-message/error-message.component';
import { studyLocationFilterPlaceholder } from '@components/form/defaults';
import { ContactFormBlock } from '@interfaces/admin-data';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FormControl, FormLabel, Input, Select, Textarea } from '@sk-web-gui/react';
import { getFormattedLabelFromValue } from '@utils/labels';
import { useFormContext } from 'react-hook-form';

export default function ContactForm({ contactFormBlock }: { contactFormBlock: ContactFormBlock }) {
  const { register, formState } = useFormContext();

  return (
    <div>
      <div className="flex flex-col gap-md medium-device:gap-[4.8rem]">
        <div>
          <h3 className="text-[2.6rem] leading-[3.6rem] medium-device:-tracking-[.01rem]">{contactFormBlock.title}</h3>
          {contactFormBlock.description ?
            <p>{contactFormBlock.description}</p>
          : <></>}
        </div>
        <div>
          <div className="flex flex-col gap-md desktop:gap-[5rem] w-full max-w-[51.5rem]">
            <FormControl className="w-full" required>
              <FormLabel>{`Välj ${studyLocationFilterPlaceholder(1)}`}</FormLabel>
              <Select {...register('municipalityEmail', { required: true })}>
                <Select.Option key={`-`} value={''}>
                  {`Välj ${studyLocationFilterPlaceholder(1)}`}
                </Select.Option>
                {contactFormBlock.emails?.map((emailObject) => (
                  <Select.Option key={`${emailObject.id}`} value={emailObject.email}>
                    {getFormattedLabelFromValue(emailObject.label)}
                  </Select.Option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="contact-name" className="w-full">
              <FormLabel>Namn*</FormLabel>
              <Input {...register('name', { required: true })} aria-describedby="contact-name-error" />
              <ErrorMessage errors={formState.errors} name="name" />
            </FormControl>
            <FormControl id="contact-email" className="w-full">
              <FormLabel>Email*</FormLabel>
              <Input {...register('email', { required: true })} aria-describedby="contact-email-error" type="email" />
              <ErrorMessage errors={formState.errors} name="email" />
            </FormControl>
            <FormControl id="contact-message" className="w-full">
              <FormLabel>Meddelande*</FormLabel>
              <Textarea
                className="w-full min-h-[15rem]"
                {...register('message', { required: true })}
                aria-describedby="contact-message-error"
                type="message"
              />
              <ErrorMessage errors={formState.errors} name="message" />
            </FormControl>
          </div>
        </div>

        <ErrorMessage errors={formState.errors} name="root" />
        <div className="flex justify-between items-start">
          <Button
            className="w-full desktop:w-fit"
            dense
            rounded
            color="primary"
            type="submit"
            data-cy="contactButton"
            rightIcon={<ArrowForwardIcon />}
          >
            Skicka
          </Button>
        </div>
      </div>
    </div>
  );
}
