import { emptyUserSavedInterest } from '@services/user-service/defaults';
import { useUserStore } from '@services/user-service/user-service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form';

interface SavedInterestsForm {
  id?: number;
  location: string[];
  category: string;
  type: string;
  /** Time interval from now plus 12 or 6
   * @default 12
   * Actual radio-picker, choices: 12, 6, 0(using date defined interval)
   */
  timeInterval: string;
  timeIntervalFrom?: string;
  timeIntervalTo?: string;
}

interface SavedInterestsFormLogicProps {
  children: React.ReactNode | React.ReactNode[];
  formData?: SavedInterestsForm;
  onSubmit?: (
    values: SavedInterestsForm,
    context: UseFormReturn<Partial<SavedInterestsForm>, unknown, undefined>
  ) => void;
}

export default function SavedInterestsFormLogic({
  children,
  formData = emptyUserSavedInterest,
  onSubmit,
}: SavedInterestsFormLogicProps) {
  const newSavedInterest = useUserStore((s) => s.newSavedInterest);
  const snackBar = useSnackbar();

  const context = useForm<Partial<SavedInterestsForm>>({
    defaultValues: useMemo(() => formData, [formData]),
    mode: 'onChange',
  });

  const { handleSubmit, reset } = context;

  const _onSubmit = async (values) => {
    if (onSubmit) {
      onSubmit(values, context);
    } else {
      const res = await newSavedInterest(values);
      if (!res.error) {
        reset();
        snackBar({
          message: 'Intresseområdet sparades.',
          status: 'success',
        });
      } else {
        snackBar({
          message: 'Det gick inte att spara intresseområdet.',
          status: 'error',
        });
      }
    }
  };

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  return (
    <FormProvider {...context}>
      <form onSubmit={handleSubmit(_onSubmit)}>{children}</form>
    </FormProvider>
  );
}
