import ErrorMessage from '@components/error-message/error-message.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, FormControl, FormLabel, Input, Textarea } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';

export default function ContactForm() {
  const { register, formState } = useFormContext();
  return (
    <div>
      <div>
        <div className="flex flex-col gap-[3.2rem]">
          <FormControl id="contact-name" className="w-[51.5rem]">
            <FormLabel>Namn*</FormLabel>
            <Input {...register('name', { required: true })} aria-describedby="contact-name-error" />
            <ErrorMessage errors={formState.errors} name="name" />
          </FormControl>
          <FormControl id="contact-email" className="w-[51.5rem]">
            <FormLabel>Email*</FormLabel>
            <Input {...register('email', { required: true })} aria-describedby="contact-email-error" type="email" />
            <ErrorMessage errors={formState.errors} name="email" />
          </FormControl>
          <FormControl id="contact-message" className="w-[51.5rem]">
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
      <div className="mt-[4.7rem] flex justify-between items-start">
        <Button rounded color="primary" type="submit" data-cy="contactButton" rightIcon={<ArrowForwardIcon />}>
          Skicka
        </Button>
      </div>
    </div>
  );
}