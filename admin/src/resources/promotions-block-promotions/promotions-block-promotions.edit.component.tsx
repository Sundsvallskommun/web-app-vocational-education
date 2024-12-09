import { useEffect } from 'react';
import { Edit, SelectInput, SimpleForm, TextInput, useGetList, useStore, useTranslate } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';
import { CustomToolbar } from '../components/custom-toolbar.component';
import { WithFormContext } from '../components/with-form-context/with-form-context.component';

export const PromotionsBlockPromotionsEdit = (props: any) => {
  useRoutePermissions();
  const translate = useTranslate();
  const [activeBlockIdEdit] = useStore('activeBlockIdEdit', '');
  return (
    <Edit {...props} redirect={() => history.back()} mutationMode="pessimistic">
      <SimpleForm
        margin="none"
        toolbar={
          <CustomToolbar
            deleteProps={{
              redirect: () => `promotionsBlock/${activeBlockIdEdit}`,
            }}
          />
        }
      >
        <WithFormContext>
          {({ watch, setValue }) => {
            const promotedPageName = watch('promotedPageName');

            const { data } = useGetList('page');
            const choices = data
              ? data
                  .map((x) => ({ id: x.pageName, name: x.pageName, pageId: x.id, url: x.url }))
                  .filter((x) => !x.url.includes('['))
              : [];

            useEffect(() => {
              setValue('promotedPageId', choices.find((x) => x.name === promotedPageName)?.pageId);
            }, [promotedPageName]);

            return (
              <>
                <h1>{`${translate('ra.action.edit')} ${translate('resources.promotionsBlockPromotions.name', {
                  smart_count: 1,
                }).toLowerCase()}`}</h1>
                <TextInput source="pageName" readOnly />
                <SelectInput source="promotedPageName" choices={choices} />
              </>
            );
          }}
        </WithFormContext>
      </SimpleForm>
    </Edit>
  );
};
