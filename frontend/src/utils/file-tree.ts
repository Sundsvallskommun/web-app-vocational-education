'server-only';

import fs from 'fs/promises';
import path from 'path';

export async function getPages(dir) {
  let results: string[] = [];
  const list = await fs.readdir(dir, { withFileTypes: true });

  for (const file of list) {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(await getPages(filePath)); // Recursive call
    } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
      // Exclude special Next.js files and dynamic routes, and the sitemap itself
      if (!file.name.startsWith('_') && !(filePath.includes('/api/') || filePath.includes('\\api\\'))) {
        results.push(
          filePath
            .replace(/\\/g, '/')
            .replace(/(.*)pages/, '')
            .replace('.tsx', '')
            .replace('.ts', '')
            .replace('/index', '')
        );
      }
    }
  }

  return results;
}
