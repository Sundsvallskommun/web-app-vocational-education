import ModalCustom from '@components/modal/modal-custom.component';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceResponse } from '@interfaces/service';
import { User } from '@interfaces/user';
import { useUserStore } from '@services/user-service/user-service';
import { Button, FormControl, FormLabel, Input } from '@sk-web-gui/react';
import { appURL } from '@utils/app-url';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function TwoFactorModal({
  show,
  setShow,
  checkError,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
  checkError: (error: NonNullable<ServiceResponse<User, string | null>['error']>) => void;
}) {
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
      if (res.data) {
        setUser(res.data);
      }
      const path: string =
        new URLSearchParams(window.location.search).get('path') || router?.query?.path?.toString() || '/';
      window.location.href = path?.startsWith('http') ? path : appURL(path?.toString());
    } else {
      checkError(res.error);
    }
    setShow(false);
  };

  return (
    <ModalCustom disableCloseOutside show={show} onClose={() => setShow(false)}>
      <form onSubmit={handleSubmit(onVerify)} className="w-full medium-device-min:min-w-[56rem]">
        <h1>Verifiera engångskod</h1>
        <FormControl className="w-full">
          <FormLabel>Engångskod</FormLabel>
          <Input {...register('code')} />
        </FormControl>
        <Button
          className="w-full desktop:w-fit mt-md px-[8rem]"
          rounded
          color="primary"
          type="submit"
          data-cy="verifyTwoFactorButton"
        >
          Verifiera
        </Button>
      </form>
    </ModalCustom>
  );
}
