import Button from '@mui/material/Button';
import { PasswordInput, useTranslate } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { generatePassword, validatePassword } from '../../utils/password';

function PasswordField() {
  const translate = useTranslate();
  const { setValue, watch, formState } = useFormContext();

  const handleGeneratePassword = () => {
    setValue('password', generatePassword(), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <Button
        variant="outlined"
        type="button"
        onClick={handleGeneratePassword}
        title="Genererar ett 14 tecken långt lösenord med minst 3 gemener, 3 versaler, 3 siffror och 3 specialtecken."
      >
        {`${translate('resources.user.generatePassword')}`}
      </Button>
      {formState.dirtyFields.password && (
        <PasswordInput
          source="password"
          value={watch().password}
          validate={validatePassword}
          required
          initiallyVisible
          autoComplete="off"
        />
      )}
    </>
  );
}

export default PasswordField;
