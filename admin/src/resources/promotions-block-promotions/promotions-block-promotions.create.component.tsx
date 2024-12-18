import { useEffect } from 'react';
import { Create, SelectInput, SimpleForm, useGetList, useStore, useTranslate } from 'react-admin';
import { pageSort, transformPageCreate } from '../../utils/data';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { WithFormContext } from '../components/with-form-context/with-form-context.component';

export const PromotionsBlockPromotionsCreate = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit');
  const [activePageIdEdit] = useStore('activePageIdEdit');
  return (
    <Create
      {...props}
      mutationMode="pessimistic"
      redirect={() => history.back()}
      transform={transformPageCreate({
        pageId: parseInt(activePageIdEdit),
        promotionsBlock: { connect: { id: parseInt(activeBlockIdEdit) } },
        promotedPageName: undefined,
      })}
    >
      <SimpleForm margin="none">
        <WithFormContext>
          {({ watch, setValue }) => {
            const promotedPageName = watch('promotedPageName');

            const { data } = useGetList('page', { pagination: { page: 1, perPage: 999 } });
            const choices = data
              ? data
                  .map((x) => ({ id: x.pageName, name: x.pageName, data: x, url: x.url }))
                  .filter((x) => !x.data.url.includes('['))
                  .sort((a, b) => pageSort(a, b))
              : [];

            useEffect(() => {
              setValue('promotedPage', { connect: { id: choices.find((x) => x.name === promotedPageName)?.data.id } });
            }, [promotedPageName]);

            return (
              <>
                <h1>{`${translate('ra.action.edit')} ${translate('resources.promotionsBlockPromotions.name', {
                  smart_count: 1,
                }).toLowerCase()}`}</h1>
                <SelectInput source="promotedPageName" optionText={(choice) => choice.url} choices={choices} />
              </>
            );
          }}
        </WithFormContext>
      </SimpleForm>
    </Create>
  );
};
