import { yupResolver } from '@hookform/resolvers/yup';
import { useUserStore } from '@services/user-service/user-service';
import { Button, FormControl, FormLabel, Input, Modal } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function TwoFactorModal({ show, setShow, checkError }) {
  const router = useRouter();
  const { verify2FA, setUser } = useUserStore();

  const formSchema = yup
    .object({
      code: yup.string().required('Kod måste anges'),
    })
    .required();

  const { handleSubmit, register } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
  });

  const onVerify = async (formValues: { code: string }) => {
    const res = await verify2FA(formValues.code.trim());
    if (!res.error) {
      setUser(res.data);
      const path = new URLSearchParams(window.location.search).get('path') || router.query.path;
      window.location.href = appURL(path?.toString() || '/');
    } else {
      checkError(res.error);
    }
    setShow(false);
  };

  return (
    <Modal
      disableCloseOutside
      show={show}
      label="Verifiera engångskod"
      className="!w-[33rem]"
      onClose={() => setShow(false)}
    >
      <form onSubmit={handleSubmit(onVerify)}>
        <FormControl>
          <FormLabel>Engångskod</FormLabel>
          <Input {...register('code')} />
        </FormControl>
        <Button className="mt-md" rounded color="primary" type="submit" data-cy="verifyTwoFactorButton">
          Verifiera
        </Button>
      </form>
    </Modal>
  );
}
