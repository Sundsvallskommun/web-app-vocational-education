import { ErrorMessage as _ErrorMessage } from '@hookform/error-message';
import { FormErrorMessage } from '@sk-web-gui/react';

export default function ErrorMessage(props: React.ComponentProps<typeof _ErrorMessage>) {
  return (
    <_ErrorMessage
      render={({ message }) => <FormErrorMessage className="mt-[1.7rem]">{message}</FormErrorMessage>}
      {...props}
    />
  );
}
