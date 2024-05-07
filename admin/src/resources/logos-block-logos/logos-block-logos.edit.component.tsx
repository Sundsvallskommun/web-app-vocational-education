import {
  Edit,
  ImageField,
  ImageInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useStore,
  useTranslate,
} from 'react-admin';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { ImageCustomField } from '../components/image-custom-field.component';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const LogosBlockLogosEdit = (props: any) => {
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
              redirect: () => `logosBlock/${activeBlockIdEdit}`,
            }}
          />
        }
      >
        <h1>{`${translate('ra.action.edit')} ${translate('resources.logosBlockLogos.name', {
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
        <ImageCustomField source="filename" label={translate('resources.components.chosenImageLabel')} />
        <ImageField source="url" title="title" />
        <ImageInput source="image">
          <ImageField source="src" title="alt" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};
