'use client';

import ContentBlock from '@components/block/content-block.component';
import { LayoutProps } from '@interfaces/admin-data';
import DefaultLayout from '@layouts/default-layout/default-layout.component';
import { Link } from '@sk-web-gui/react';
import NextLink from 'next/link';
import React from 'react';

interface TOCNode {
  __path: string;
  __children: Record<string, TOCNode>;
}

const generateTOC = (paths: string[]) => {
  const root: Record<string, TOCNode> = {
    startsida: {
      __path: '/',
      __children: {},
    },
  };

  // Build a nested structure of paths
  paths.forEach((path) => {
    if (!path) return; // Skip empty strings
    const segments = path.split('/').filter(Boolean);
    let current = root;
    segments.forEach((segment, index) => {
      const segmentTyped = segment as keyof typeof current;
      if (!current[segmentTyped]) {
        current[segmentTyped] = {
          __path: index === segments.length - 1 ? path : '',
          __children: {},
        };
      }
      // Ensure all segments get a path for standalone pages
      if (index === segments.length - 1 || !current[segmentTyped].__path) {
        current[segmentTyped].__path = path;
      }
      current = current[segmentTyped].__children;
    });
  });

  // Recursive function to create list elements
  const createList = (obj: Record<string, TOCNode>): React.JSX.Element => {
    return (
      <ul className="ml-md">
        {Object.keys(obj).map((key) => {
          const { __path, __children } = obj[key];
          return (
            <li key={key}>
              {__path && !__path.includes('[') ?
                <Link as={NextLink} href={__path}>
                  /{key}
                </Link>
              : key}
              {Object.keys(__children).length > 0 && createList(__children)}
            </li>
          );
        })}
      </ul>
    );
  };

  return createList(root);
};

function SiteMap({ pages, layoutData }: LayoutProps & { pages: string[] }) {
  return (
    <DefaultLayout layoutData={layoutData}>
      <ContentBlock classNameWrapper="!mt-lg">
        <h1>Sitemap</h1>
        <nav id="sitemap-toc" className="mt-lg">
          {generateTOC(pages)}
        </nav>
      </ContentBlock>
    </DefaultLayout>
  );
}

export default SiteMap;
