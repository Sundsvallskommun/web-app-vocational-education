import { yupResolver } from '@hookform/resolvers/yup';
import { LoginCredentials } from '@interfaces/user';
import { useUserStore } from '@services/user-service/user-service';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import TwoFactorModal from './verify2FA-modal.component';

export default function LoginFormLogic({ children }: { children: React.ReactNode }) {
  const { login } = useUserStore();
  const [show2FAModal, setShow2FAModal] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const failMessage = params.get('failMessage');

  const formSchema = yup
    .object({
      username: yup.string().required('Användarnamn måste anges'),
      password: yup.string().required('Lösenord måste anges'),
    })
    .required();

  const context = useForm<LoginCredentials>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, setError } = context;

  const checkError = (error: string | null) => {
    switch (error) {
      case 'INVALID_CREDENTIALS':
        setError('root', { type: 'string', message: 'Felaktigt användarnamn eller lösenord' });
        break;
      case 'MISSING_PERMISSIONS':
        setError('root', { type: 'string', message: 'Användaren saknar rättigheter' });
        break;
      case 'INVALID_CODE_OR_EXPIRED':
        setError('root', { type: 'string', message: 'Engångskoden är felaktig eller har gått ut' });
        break;
      default:
    }
  };

  const onLogin = async (data: LoginCredentials) => {
    const res = await login(data);
    if (!res.error) {
      setShow2FAModal(true);
    } else {
      checkError(res.error);
    }
  };

  useEffect(() => {
    checkError(failMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failMessage]);

  return (
    <>
      <FormProvider {...context}>
        <form onSubmit={handleSubmit(onLogin)}>{children}</form>
      </FormProvider>
      <TwoFactorModal show={show2FAModal} setShow={setShow2FAModal} checkError={checkError} />
    </>
  );
}
