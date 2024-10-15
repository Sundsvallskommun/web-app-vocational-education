import ErrorMessage from '@components/error-message/error-message.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, FormControl, FormLabel, Input, Select, Textarea } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';
import { studyLocationFilterPlaceholder } from '../form/study-location.input.component';
import { useFiltersContext } from '@contexts/filters.context';
import { getFormattedLabelFromValue } from '@utils/labels';

export default function ContactForm() {
  const { register, formState } = useFormContext();
  const { filters } = useFiltersContext();

  return (
    <div>
      <div>
        <div className="flex flex-col gap-[3.2rem] w-full max-w-[51.5rem]">
          <h3 className="text-[2.6rem] leading-[3.6rem] medium-device:-tracking-[.01rem]">Kontaktformulär</h3>
          <FormControl className="w-full" required>
            <FormLabel>{`Välj ${studyLocationFilterPlaceholder}`}</FormLabel>
            <Select {...register('municipality', { required: true })}>
              <Select.Option key={`-`} value={''}>
                {`Välj ${studyLocationFilterPlaceholder}`}
              </Select.Option>
              {filters?.studyLocation?.map((value) => (
                <Select.Option key={`${value}`} value={value}>
                  {getFormattedLabelFromValue(value)}
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
      <div className="mt-[4.7rem] flex justify-between items-start">
        <Button rounded color="primary" type="submit" data-cy="contactButton" rightIcon={<ArrowForwardIcon />}>
          Skicka
        </Button>
      </div>
    </div>
  );
}
