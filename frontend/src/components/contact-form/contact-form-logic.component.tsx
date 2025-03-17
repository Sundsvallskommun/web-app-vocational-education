import { yupResolver } from '@hookform/resolvers/yup';
import { ContactForm } from '@interfaces/user';
import { sendFormData } from '@services/contact-service';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSnackbar } from '@sk-web-gui/react';
import { FiltersFetcher } from '@contexts/filters/filters.context';

export default function ContactFormLogic({ children }: { children: React.ReactNode }) {
  const message = useSnackbar();

  const formSchema = yup
    .object({
      municipalityEmail: yup.string().required('Kommun måste anges'),
      name: yup.string().required('Namn måste anges'),
      email: yup.string().required('Email måste anges').email('Formatet på epostadressen är felaktig'),
      message: yup.string().required('Meddelande måste anges'),
    })
    .required();

  const context = useForm<ContactForm>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      municipalityEmail: '',
      name: '',
      email: '',
      message: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit } = context;

  const onSend = async (data: ContactForm) => {
    const res = await sendFormData(data);
    if (!res.error) {
      message({ message: 'Meddelandet skickades', status: 'success' });
    } else {
      message({ message: 'Något gick fel när meddelandet skickades', status: 'error' });
    }
  };

  return (
    <>
      <FormProvider {...context}>
        <FiltersFetcher filters={['studyLocation']}>
          <form onSubmit={handleSubmit(onSend)}>{children}</form>
        </FiltersFetcher>
      </FormProvider>
    </>
  );
}
