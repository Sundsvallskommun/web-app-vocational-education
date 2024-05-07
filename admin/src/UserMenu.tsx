import SettingsIcon from '@mui/icons-material/Settings';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React from 'react';
import { Logout, UserMenu as RAUserMenu, useGetIdentity, useUserMenu } from 'react-admin';
import { useNavigate } from 'react-router';

const ConfigurationMenu = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>((props, ref) => {
  const { data: user } = useGetIdentity();
  const { onClose } = useUserMenu();
  const navigate = useNavigate();

  const handleUserSettings = () => {
    navigate(`/user/${user?.id}`);
    onClose();
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
