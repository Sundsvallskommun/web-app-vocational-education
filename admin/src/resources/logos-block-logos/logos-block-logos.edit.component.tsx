import {
  Edit,
  ImageField,
  ImageInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
  WithRecord,
  useTranslate,
} from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { ImageCustomField } from '../components/image-custom-field.component';

export const LogosBlockLogosEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <WithRecord
        render={(data) => (
          <SimpleForm
            margin="none"
            toolbar={
              <CustomToolbar
                deleteProps={{
                  redirect: () => `logosBlock/${data.blockId}`,
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
                readOnly
                value={data.blockId}
                defaultValue={data.blockId}
              />
            </ReferenceInput>
            <TextInput source="alt" />
            <ImageCustomField source="filename" label={translate('resources.components.chosenImageLabel')} />
            <ImageField source="url" title="title" />
            <ImageInput source="image">
              <ImageField source="src" title="alt" />
            </ImageInput>
          </SimpleForm>
        )}
      />
    </Edit>
  );
};
