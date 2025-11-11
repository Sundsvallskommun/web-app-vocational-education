import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { transformPageCreate } from '../../utils/data';

export const LogosBlockLogosCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  const [activePageIdEdit] = useStore('activePageIdEdit');
  return (
    <Create
      {...props}
      redirect={() => history.back()}
      mutationMode="pessimistic"
      transform={transformPageCreate({ pageId: parseInt(activePageIdEdit) })}
    >
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.logosBlockLogos.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="logosBlock" reference="logosBlock">
          <SelectInput
            source="logosBlock"
            optionText="pageName"
            readOnly
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
