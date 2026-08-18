import { Create, ReferenceInput, SelectInput, SimpleForm, TextInput, useStore, useTranslate } from 'react-admin';
import { transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { Wysiwyg } from '../components/wysiwyig/wysiwyg.component';

export const EmployerPromotionsBlockPromotionsCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit', '');
  const [activePageIdEdit] = useStore('activePageIdEdit', '');

  return (
    <Create
      {...props}
      redirect={() => history.back()}
      mutationMode="pessimistic"
      transform={transformPageCreate({ pageId: parseInt(activePageIdEdit) })}
    >
      <SimpleForm>
        <h1>{`${translate('ra.action.create')} ${translate('resources.employerPromotionsBlockPromotions.name', {
          smart_count: 1,
        })}`}</h1>
        <ReferenceInput source="employerPromotionsBlock" reference="employerPromotionsBlock">
          <SelectInput
            source="employerPromotionsBlock"
            optionText="id"
            readOnly
            value={parseInt(activeBlockIdEdit)}
            defaultValue={parseInt(activeBlockIdEdit)}
          />
        </ReferenceInput>
        <TextInput source="title" />
        <TextInput
          source="ingress"
          multiline
          sx={{ hyphens: 'auto' }}
          slotProps={{
            htmlInput: { sx: { width: '576px', fontFamily: 'Montserrat', minHeight: '3em' } },
          }}
        />
        <Wysiwyg />
        <TextInput source="searchPhrase" />
      </SimpleForm>
    </Create>
  );
};
