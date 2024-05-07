import ErrorMessage from '@components/error-message/error-message.component';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, FormControl, FormLabel, Input } from '@sk-web-gui/react';
import { useFormContext } from 'react-hook-form';

export default function LoginForm() {
  const { register, formState } = useFormContext();

  return (
    <div>
      <div>
        <div className="flex flex-col gap-[3.2rem]">
          <FormControl id="login-username" className="w-full">
            <FormLabel>Användarnamn*</FormLabel>
            <Input {...register('username')} aria-describedby="login-username-error" />
            <ErrorMessage errors={formState.errors} name="username" />
          </FormControl>
          <FormControl id="login-password" className="w-full">
            <FormLabel>Lösenord*</FormLabel>
            <Input {...register('password')} aria-describedby="login-password-error" type="password" />
            <ErrorMessage errors={formState.errors} name="password" />
          </FormControl>
        </div>
      </div>

      <ErrorMessage errors={formState.errors} name="root" />
      <div className="mt-[4.7rem] flex justify-between items-start">
        <Button rounded color="primary" type="submit" data-cy="loginButton" rightIcon={<ArrowForwardIcon />}>
          Logga in
        </Button>
        <Button type="button" variant="link">
          Glömt lösenord?
        </Button>
      </div>
    </div>
  );
}
