import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { Menu, useGetList, useStore } from 'react-admin';
import { ListItemIcon } from './Menu';

const pageSort = (a: NestedPage, b: NestedPage) => {
  const urlsToPutLast = [
    '/404',
    '/login',
    '/kakor',
    '/om-webbplatsen',
    '/personuppgifter',
    '/tillganglighetsredogorelse',
    '/kontakta-oss',
  ];

  const aUrl = a?.url || '';
  const bUrl = b?.url || '';

  const aIsLast = urlsToPutLast.includes(aUrl);
  const bIsLast = urlsToPutLast.includes(bUrl);

  if (aIsLast && bIsLast) return 0; // Keep their relative order if both are "last" URLs
  if (aIsLast) return 1; // Push `a` after `b`
  if (bIsLast) return -1; // Push `b` after `a`

  // Regular sorting for other URLs
  return aUrl.localeCompare(bUrl);
};

const findPathToActivePage = (
  pages: { [key: string]: NestedPage },
  targetId: string,
  path: string[] = []
): string[] => {
  for (const key of Object.keys(pages)) {
    const page = pages[key];
    if (page.id?.toString() === targetId) return [...path, key];
    if (page.children) {
      const childPath = findPathToActivePage(page.children, targetId, [...path, key]);
      if (childPath.length > 0) return childPath;
    }
  }
  return [];
};

type NestedPage = {
  id?: string;
  url?: string;
  children?: { [key: string]: NestedPage };
};

export function NestedMenu({
  nestedPages,
  activePageIdEdit,
  onPage,
  openKeys,
  setOpenKeys,
}: {
  nestedPages: { [key: string]: NestedPage };
  activePageIdEdit: string;
  onPage: boolean;
  openKeys: { [key: string]: boolean };
  setOpenKeys: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}) {
  const toggleOpen = (key: string) => {
    setOpenKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeAll = () => {
    setOpenKeys({});
  };

  return (
    <ul style={{ paddingLeft: '1rem' }}>
      {Object.keys(nestedPages)
        .sort((a, b) => pageSort(nestedPages[a], nestedPages[b]))
        .map((key) => {
          const isOpen = openKeys[key];
          const page = nestedPages[key];
          return (
            <li
              key={page.id || key}
              style={{
                marginBottom: '0.5rem',
                listStyle: 'none',
                backgroundColor: isOpen ? 'rgba(0,0,0,.02)' : 'transparent',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Menu.Item
                  onClick={() => (page.id ? closeAll() : toggleOpen(key))}
                  to={page.id ? `page/${page.id}` : '#'}
                  primaryText={`/${key}`}
                  leftIcon={<ListItemIcon icon={!page.id ? MenuIcon : undefined} />}
                  className={`${page.id?.toString() === activePageIdEdit && onPage ? 'MenuItem-active' : ''}`}
                  style={{ flexGrow: '1' }}
                  sx={{
                    '&.MuiMenuItem-root': {
                      color: 'black',
                      fontStyle: !page.id ? 'italic' : 'normal',
                    },
                    '&.MenuItem-active': {
                      backgroundColor: '#655afc',
                      color: 'white',
                    },
                    '&.MenuItem-active .RaMenuItemLink-icon': {
                      color: 'white',
                    },
                  }}
                />
                {page.children && Object.keys(page.children).length > 0 && (
                  <IconButton
                    aria-label={isOpen ? 'Minimera meny' : 'Expandera meny'}
                    color="primary"
                    onClick={() => toggleOpen(key)}
                  >
                    {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </div>
              {isOpen && page.children && (
                <NestedMenu
                  nestedPages={page.children}
                  activePageIdEdit={activePageIdEdit}
                  onPage={onPage}
                  openKeys={openKeys}
                  setOpenKeys={setOpenKeys}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
}

function buildNestedPages(pages: { id: string; url: string }[]) {
  const root: any = {};

  pages.forEach((page) => {
    const parts = page.url === '/' ? [''] : page.url.split('/').filter(Boolean);
    let current = root;

    parts.forEach((part, index) => {
      current[part] = current[part] || { children: {} };

      if (index === parts.length - 1) {
        // Assign the page data to the last part
        current[part] = { ...current[part], ...page };
      }

      current = current[part].children;
    });
  });

  return root;
}

export const PagesNavigation = () => {
  const { data: pages } = useGetList('page', { pagination: { page: 1, perPage: 999 } });
  const onPage = window.location.href.match(/\/page\//) !== null;
  const [activePageIdEdit] = useStore('activePageIdEdit');

  const nestedPages = pages ? buildNestedPages(pages) : {};

  const [openKeys, setOpenKeys] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const pathToActivePage = findPathToActivePage(nestedPages, activePageIdEdit);
    setOpenKeys(pathToActivePage.reduce((acc, key) => ({ ...acc, [key]: true }), {}));
  }, [pages, activePageIdEdit]);

  return (
    <NestedMenu
      nestedPages={nestedPages}
      activePageIdEdit={activePageIdEdit}
      onPage={onPage}
      openKeys={openKeys}
      setOpenKeys={setOpenKeys}
    />
  );
};
