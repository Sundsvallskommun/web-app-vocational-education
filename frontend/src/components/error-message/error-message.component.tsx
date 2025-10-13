import { ErrorMessage as _ErrorMessage } from '@hookform/error-message';
import { FormErrorMessage } from '@sk-web-gui/react';

export default function ErrorMessage(props: React.ComponentProps<typeof _ErrorMessage>) {
  return (
    <_ErrorMessage
      render={({ message }) => <FormErrorMessage className="mt-[1.7rem] w-fit border-[0.1rem] border-dotted rounded-6 p-4 border-error">{message}</FormErrorMessage>}
      {...props}
    />
  );
}
