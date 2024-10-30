import { useEffect } from 'react';
import { Create, SelectInput, SimpleForm, TextInput, useGetList, useStore, useTranslate } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

const FormElements = () => {
  const translate = useTranslate();
  const { watch, setValue } = useFormContext();
  const promotedPageName = watch('promotedPageName');

  const { data } = useGetList('page');
  const choices = data
    ? data.map((x) => ({ id: x.pageName, name: x.pageName, data: x })).filter((x) => !x.data.url.includes('['))
    : [];

  useEffect(() => {
    setValue('promotedPage', { connect: { id: choices.find((x) => x.name === promotedPageName)?.data.id } });
  }, [promotedPageName]);

  return (
    <>
      <h1>{`${translate('ra.action.edit')} ${translate('resources.promotionsBlockPromotions.name', {
        smart_count: 1,
      }).toLowerCase()}`}</h1>
      <SelectInput source="promotedPageName" choices={choices} />
    </>
  );
};

export const PromotionsBlockPromotionsCreate = (props: any) => {
  useRoutePermissions();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  const [activePageIdEdit] = useStore('activePageIdEdit');
  return (
    <Create
      {...props}
      mutationMode="pessimistic"
      transform={transformPageCreate({
        pageId: parseInt(activePageIdEdit),
        promotionsBlock: { connect: { id: parseInt(activeBlockIdEdit) } },
        promotedPageName: undefined,
      })}
    >
      <SimpleForm margin="none">
        <FormElements />
      </SimpleForm>
    </Create>
  );
};
