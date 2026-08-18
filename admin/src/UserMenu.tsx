import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React from 'react';
import { Logout, UserMenu as RAUserMenu, useGetIdentity, useUserMenu } from 'react-admin';
import { useNavigate } from 'react-router';

const ConfigurationMenu = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>((props, ref) => {
  const { data: user } = useGetIdentity();
  // react-admin 5 returns undefined when the hook is used outside a UserMenu.
  const userMenu = useUserMenu();
  const navigate = useNavigate();

  const handleUserSettings = () => {
    navigate(`/user/${user?.id}`);
    userMenu?.onClose();
  };

  return (
    <MenuItem ref={ref} {...props} onClick={handleUserSettings}>
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Inställningar</ListItemText>
    </MenuItem>
  );
});

const UserMenu = (props: any) => {
  return (
    <RAUserMenu {...props}>
      <ConfigurationMenu />
      <Logout />
    </RAUserMenu>
  );
};

export default UserMenu;
