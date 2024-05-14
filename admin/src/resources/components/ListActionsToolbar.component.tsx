import { CreateButton, ExportButton, FilterButton, SelectColumnsButton, TopToolbar, useListContext } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const CustomListActions = () => {
  const { isSuperAdmin } = useRoutePermissions();

  return (
    <>
      {isSuperAdmin && (
        <TopToolbar>
          {/* <SelectColumnsButton /> */}
          {/* <FilterButton /> */}
          <CreateButton />
          {/* <ExportButton /> */}
        </TopToolbar>
      )}
    </>
  );
};
