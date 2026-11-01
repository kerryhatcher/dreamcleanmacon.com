import { readFile, writeFile } from 'node:fs/promises';

// Keep crawlers able to read the noindex response header on every preview.
let headers = '';
try { headers = await readFile('dist/_headers', 'utf8'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
if (!headers.includes('X-Robots-Tag: noindex, nofollow')) {
  // Cloudflare keeps the last block for a repeated path. Extend the existing
  // wildcard block so preview indexing rules do not replace security headers.
  headers = /^\/\*\s*$/m.test(headers)
    ? headers.replace(/^(\/\*)\s*$/m, '$1\n  X-Robots-Tag: noindex, nofollow')
    : `${headers}\n/*\n  X-Robots-Tag: noindex, nofollow\n`;
  await writeFile('dist/_headers', headers);
}
await writeFile('dist/robots.txt', 'User-agent: *\nAllow: /\n');
