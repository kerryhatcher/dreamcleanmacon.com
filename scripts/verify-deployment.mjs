import assert from 'node:assert/strict';

const [origin, mode] = process.argv.slice(2);
assert(origin && ['preview', 'production'].includes(mode), 'Usage: node scripts/verify-deployment.mjs <origin> <preview|production>');
const canonicalOrigin = 'https://www.dreamcleanmacon.com';
async function request(path) {
  return fetch(new URL(path, origin), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
}
for (const path of ['/', '/housekeeping/', '/move-in-move-out-cleaning/']) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path}: expected HTTP 200`);
  const header = response.headers.get('x-robots-tag') || '';
  if (mode === 'preview') assert.match(header, /noindex,\s*nofollow/i, `${path}: missing preview indexing header`);
  else assert(!/noindex/i.test(header), `${path}: production must be indexable`);
  const html = await response.text();
  assert(html.includes(`href="${canonicalOrigin}${path}"`), `${path}: missing production canonical`);
  const blocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert(blocks.length, `${path}: missing JSON-LD`);
  for (const [, json] of blocks) JSON.parse(json);
}
const robots = await request('/robots.txt');
assert.equal(robots.status, 200);
const robotsText = await robots.text();
assert.match(robotsText, /Allow:\s*\//);
assert(!/^Disallow:\s*\//m.test(robotsText), 'Crawlers must be able to read indexing headers');
if (mode === 'production') assert(robotsText.includes(`${canonicalOrigin}/sitemap-index.xml`));
const index = await request('/sitemap-index.xml');
assert.equal(index.status, 200);
assert((await index.text()).includes(`${canonicalOrigin}/sitemap-0.xml`));
const sitemap = await request('/sitemap-0.xml');
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
for (const path of ['/', '/housekeeping/', '/move-in-move-out-cleaning/']) assert(xml.includes(`<loc>${canonicalOrigin}${path}</loc>`));
assert(!xml.includes('/404'), '404 must be excluded from sitemap');
assert.equal((await request('/seo-verification-missing-page')).status, 404, 'Missing URLs must return 404');
console.log(`Verified ${mode} deployment: ${origin}`);
