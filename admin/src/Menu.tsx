import Label from '@mui/icons-material/Label';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Menu, usePermissions, useTranslate } from 'react-admin';
import { PagesNavigation } from './PagesNavigation';

export const ListItemIcon = ({ icon }: { icon?: React.ElementType }) => {
  const Comp = icon ? icon : Label;
  return <Comp sx={{ width: '.5em', height: '.5em', color: 'rgba(0,0,0,.25)' }} />;
};

export const CustomMenu = () => {
  const translate = useTranslate();
  const { permissions } = usePermissions();
  const onPageListPage = window.location.href.match(/\/page$/) !== null;
  const onFooterPage = window.location.href.match(/\/footer\//) !== null;
  const onAccountsPage = window.location.href.match(/\/user(\/|$)/) !== null;

  return (
    <Menu>
      <li>
        <Menu.Item
          className={`${onPageListPage ? 'MenuItem-active' : ''}`}
          sx={{
            '&.MenuItem-active': {
              backgroundColor: '#655afc',
              color: 'white',
            },
            '&.MenuItem-active .RaMenuItemLink-icon': {
              color: 'white',
            },
          }}
          to="/page"
          primaryText="Sidor"
          leftIcon={<ViewListIcon />}
        />

        <PagesNavigation />
      </li>

      {permissions?.adminEdit && (
        <li>
          <h2 style={{ fontSize: '1rem', paddingLeft: '16px', marginTop: '16px' }}>Layout</h2>
          <Menu.Item
            className={`${onFooterPage ? 'MenuItem-active' : ''}`}
            sx={{
              '&.MenuItem-active': {
                backgroundColor: '#655afc',
                color: 'white',
              },
              '&.MenuItem-active .RaMenuItemLink-icon': {
                color: 'white',
              },
            }}
            to="/footer/1"
            primaryText={translate('resources.footer.name', { smart_count: 1 })}
            leftIcon={<ListItemIcon />}
          />
        </li>
      )}
      {permissions?.adminEditAccounts && (
        <li>
          <h2 style={{ fontSize: '1rem', paddingLeft: '16px', marginTop: '16px' }}>Konton</h2>
          <Menu.Item
            className={`${onAccountsPage ? 'MenuItem-active' : ''}`}
            sx={{
              '&.MenuItem-active': {
                backgroundColor: '#655afc',
                color: 'white',
              },
              '&.MenuItem-active .RaMenuItemLink-icon': {
                color: 'white',
              },
            }}
            to="/user"
            primaryText={translate('resources.user.name', { smart_count: 2 })}
            leftIcon={<ListItemIcon />}
          />
        </li>
      )}
    </Menu>
  );
};
