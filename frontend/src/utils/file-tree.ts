'server-only';

import { getAdminPages } from '@services/page-service';
import fs from 'fs/promises';
import path from 'path';

export async function getFilePages(dir: string) {
  let results: string[] = [];
  const list = await fs.readdir(dir, { withFileTypes: true });
  console.log('processing list:', list);

  for (const file of list) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(await getFilePages(filePath)); // Recursive call
    } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
      // Exclude special Next.js files and dynamic routes, and the sitemap itself
      if (
        !file.name.startsWith('_') &&
        file.name !== 'layout.tsx' &&
        file.name !== 'sitemap.ts' &&
        !(filePath.includes('/api/') || filePath.includes('\\api\\')) &&
        !filePath.includes('[')
      ) {
        results.push(
          filePath
            .replace(/\\/g, '/')
            .replace(/(.*)app/, '')
            .replace('.tsx', '')
            .replace('.ts', '')
            .replace('/page', '')
        );
      }
    }
  }

  return results;
}

export async function getPages(dir: string) {
  console.log('getting pages for dir:', dir);
  const filePages = await getFilePages(dir); // string[]
  const adminPages = await getAdminPages(); // { url: string }[]

  return Array.from(new Set([...filePages, ...adminPages.map((page) => page.url)]));
}
