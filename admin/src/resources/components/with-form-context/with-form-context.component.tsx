import { useFormContext, UseFormReturn } from 'react-hook-form';
import React from 'react';

type WithFormContextProps = {
  children: (context: UseFormReturn) => React.ReactNode;
};

export const WithFormContext: React.FC<WithFormContextProps> = ({ children }) => {
  const formContext = useFormContext();
  return <>{children(formContext)}</>;
};
