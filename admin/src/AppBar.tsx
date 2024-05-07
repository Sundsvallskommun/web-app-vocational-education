import Link from '@mui/material/Link';
import { AppBar as RAAppBar } from 'react-admin';
import UserMenu from './UserMenu';

const AppBar = () => (
  <RAAppBar userMenu={<UserMenu />} toolbar={<div></div>}>
    <div style={{ flexGrow: '1', textAlign: 'center' }}>Yrkesutbildning Mitt Admin</div>

    <Link sx={{ color: 'white', marginRight: '1rem' }} href={`${import.meta.env.VITE_MAIN_APP_URL}`}>
      Till Yrkesutbildning Mitt
    </Link>
  </RAAppBar>
);

export default AppBar;
