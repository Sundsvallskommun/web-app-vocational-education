import { useEffect } from 'react';
import {
  BooleanInput,
  Edit,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetList,
  useGetRecordId,
  useRedirect,
  useStore,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { EditImportantDatesBlockDateCards } from '../components/important-dates-block-date-cards.edit.component';
import { WithFormContext } from '../components/with-form-context/with-form-context.component';

export const ImportantDatesBlockEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activePageIdEdit] = useStore('activePageIdEdit', '');
  const [_, setValue] = useStore('activeBlockIdEdit', '');
  const recordId = useGetRecordId();
  const redirect = useRedirect();
  useEffect(() => {
    setValue(recordId.toString());
  }, [recordId]);
  return (
    <Edit {...props} redirect={false} mutationMode="pessimistic">
      <SimpleForm
        margin="none"
        toolbar={
          <CustomToolbar
            deleteProps={{
              redirect: () => `page/${activePageIdEdit}`,
            }}
            backProps={{ onClick: () => redirect(`/page/${activePageIdEdit}`) }}
          />
        }
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.importantDatesBlock.name', {
          smart_count: 1,
        }).toLowerCase()}`}</h1>
        <TextInput source="pageName" readOnly />
        <BooleanInput source="showBlock" />
        <BooleanInput source="showAll" />
        <BooleanInput source="showSeeAllButton" />
        <NumberInput source="amountShown" />
        <TextInput source="title" />
        <WithFormContext>
          {({ watch, setValue }) => {
            const referencedImportantDatesBlockId = watch('referencedImportantDatesBlockId');

            const { data } = useGetList('importantDatesBlock', { meta: { pageName: watch('pageName') } });
            const choices = data ? data.map((x) => ({ id: x.pageName, name: x.pageName, data: x })) : [];

            useEffect(() => {
              setValue('referencedImportantDatesBlock', {
                connect: { id: choices.find((x) => x.name === referencedImportantDatesBlockId)?.data.id },
              });
            }, [referencedImportantDatesBlockId]);

            return (
              <>
                <SelectInput source="referencedImportantDatesBlockPageName" choices={choices} />
                <EditImportantDatesBlockDateCards filterPageName={watch('referencedImportantDatesBlockPageName')} />
              </>
            );
          }}
        </WithFormContext>
      </SimpleForm>
    </Edit>
  );
};
