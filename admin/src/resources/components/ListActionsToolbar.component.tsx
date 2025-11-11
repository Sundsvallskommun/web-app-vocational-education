import { CreateButton, TopToolbar } from 'react-admin';
import useRoutePermissions from '../../utils/use-route-permissions.hook';

export const CustomListActions: React.FC<{ adminOnly?: boolean; devOnly?: boolean; show?: boolean }> = ({
  adminOnly = true,
  devOnly = false,
  show = false,
}) => {
  const { isSuperAdmin, isAdmin } = useRoutePermissions();

  const showToolbar = devOnly ? isSuperAdmin : adminOnly ? isAdmin : show;

  return (
    <>
      {showToolbar && (
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
