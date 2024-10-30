import { Create, SimpleForm, TextInput, useGetOne, useStore, useTranslate } from 'react-admin';
import { transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const ContactFormBlockEmailsCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  const [activePageIdEdit] = useStore('activePageIdEdit');
  const { data: pageData } = useGetOne('page', { id: activePageIdEdit });
  return (
    <Create
      {...props}
      redirect={() => history.back()}
      mutationMode="pessimistic"
      transform={transformPageCreate({
        pageId: parseInt(activePageIdEdit),
        contactFormBlock: { connect: { id: parseInt(activeBlockIdEdit) } },
        pageName: undefined,
      })}
    >
      <SimpleForm margin="none">
        <h1>{`${translate('ra.action.create')} ${translate('resources.contactFormBlockEmails.name', {
          smart_count: 1,
        })}`}</h1>

        <TextInput source="pageName" defaultValue={pageData?.pageName} readOnly />
        <TextInput source="label" />
        <TextInput source="email" />
      </SimpleForm>
    </Create>
  );
};
