import LabelIcon from '@mui/icons-material/Label';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Menu, useGetList, usePermissions, useStore, useTranslate } from 'react-admin';

export const CustomMenu = () => {
  const translate = useTranslate();
  const { data: pages } = useGetList('page');
  const [activePageIdEdit] = useStore('activePageIdEdit');
  const { permissions } = usePermissions();
  const onPage = window.location.href.match(/\/page\//) !== null;
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

        <ul style={{ paddingLeft: '0.5rem' }}>
          {pages
            ?.sort((a, b) => (a.url > b.url ? 1 : -1))
            ?.map((page) => (
              <li key={`${page.id}`}>
                <Menu.Item
                  to={`page/${page.id}`}
                  primaryText={`${page.url}`}
                  leftIcon={<LabelIcon />}
                  className={`${page.id == activePageIdEdit && onPage ? 'MenuItem-active' : ''}`}
                  sx={{
                    '&.MenuItem-active': {
                      backgroundColor: '#655afc',
                      color: 'white',
                    },
                    '&.MenuItem-active .RaMenuItemLink-icon': {
                      color: 'white',
                    },
                  }}
                />
              </li>
            ))}
        </ul>
      </li>

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
          leftIcon={<LabelIcon />}
        />
      </li>
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
            leftIcon={<LabelIcon />}
          />
        </li>
      )}
    </Menu>
  );
};
