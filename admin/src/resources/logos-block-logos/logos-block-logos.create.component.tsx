import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const LogosBlockLogosCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  return (
    <Create {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.logosBlockLogos.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="logosBlock" reference="logosBlock">
          <SelectInput
            source="logosBlock"
            optionText="pageName"
            disabled
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <TextInput source="alt" />
        <TextInput source="src" />
      </SimpleForm>
    </Create>
  );
};
