import { FiltersFetcher } from '@contexts/filters/filters.context';
import { UserSavedInterestDto } from '@interfaces/user';
import { emptyUserSavedInterest } from '@services/user-service/defaults';
import { useUserStore } from '@services/user-service/user-service';
import { useSnackbar } from '@sk-web-gui/react';
import { useEffect, useMemo } from 'react';
import { DefaultValues, FieldValues, FormProvider, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';

export interface SavedInterestsFormValues extends UserSavedInterestDto {
  id?: number;
}

interface SavedInterestsFormLogicProps<
  TFormValues extends FieldValues & UserSavedInterestDto = SavedInterestsFormValues,
> {
  children: React.ReactNode | React.ReactNode[];
  formData?: TFormValues;
  onSubmit?: (values: TFormValues, context: UseFormReturn<TFormValues, unknown, undefined>) => void;
}

export default function SavedInterestsFormLogic<
  TFormValues extends FieldValues & UserSavedInterestDto = SavedInterestsFormValues,
>({ children, formData = emptyUserSavedInterest as TFormValues, onSubmit }: SavedInterestsFormLogicProps<TFormValues>) {
  const newSavedInterest = useUserStore((s) => s.newSavedInterest);
  const snackBar = useSnackbar();

  const context = useForm<TFormValues>({
    defaultValues: useMemo(() => formData as DefaultValues<TFormValues>, [formData]),
    mode: 'onChange',
  });

  const { handleSubmit, reset } = context;

  const _onSubmit: SubmitHandler<TFormValues> = async (values) => {
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
      <FiltersFetcher filters={['category', 'level', 'studyLocation']}>
        <form onSubmit={handleSubmit(_onSubmit)}>{children}</form>
      </FiltersFetcher>
    </FormProvider>
  );
}
