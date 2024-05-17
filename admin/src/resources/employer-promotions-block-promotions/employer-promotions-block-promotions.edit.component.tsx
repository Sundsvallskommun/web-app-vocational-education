import { Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { Wysiwyg } from '../components/wysiwyig/wysiwyg.component';

export const EmployerPromotionsBlockPromotionsEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm
        margin="none"
        toolbar={
          <CustomToolbar
            deleteProps={{
              redirect: () => `employerPromotionsBlock/${activeBlockIdEdit}`,
            }}
          />
        }
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.employerPromotionsBlockPromotions.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="employerPromotionsBlock" reference="employerPromotionsBlock">
          <SelectInput
            source="employerPromotionsBlock"
            optionText="pageName"
            disabled
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <TextInput source="title" />
        <TextInput
          source="ingress"
          multiline
          sx={{ hyphens: 'auto' }}
          inputProps={{
            sx: { width: '576px', fontFamily: 'Montserrat', minHeight: '3em' },
          }}
        />
        <Wysiwyg />
        <TextInput source="searchPhrase" />
      </SimpleForm>
    </Edit>
  );
};
