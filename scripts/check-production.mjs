import assert from 'node:assert/strict';

const origin = process.argv[2] || 'http://127.0.0.1:3000';
const read = async path => {
  const response = await fetch(new URL(path, origin), { redirect: 'manual' });
  return { response, html: await response.text() };
};
const documents = new Map();
for (const [path, title] of [['/', 'Jothivasan | Full Stack Developer'], ['/contact', 'Contact Jothivasan | Start a Conversation'], ['/privacy', 'Privacy Policy | Jothivasan']]) {
  const { response, html } = await read(path);
  assert.equal(response.status, 200, path);
  assert.ok(html.includes(`<title>${title}</title>`), `${path}: metadata`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.ok(canonical, `${path}: canonical`);
  assert.equal(new URL(canonical[1]).href, new URL(path, "https://jothivasan.dev").href);
  if (path !== '/privacy') assert.ok(html.includes('application/ld+json'), `${path}: JSON-LD`);
  assert.ok(html.includes('id="main-content"'), `${path}: main content`);
  assert.ok(!html.includes('/src/main.tsx'), `${path}: no Vite entry`);
  documents.set(path, html);
  console.log(`PASS ${path}: server-rendered content and metadata`);
}
for (const id of ['information', 'use', 'submissions', 'communication', 'services', 'analytics', 'retention', 'security', 'requests', 'changes', 'contact']) {
  assert.ok(documents.get('/privacy').includes(`id="privacy-${id}"`), `Missing privacy section ${id}`);
}
assert.match(documents.get('/privacy'), /<time\b[^>]*datetime="2026-10-07"/i, 'Privacy policy review date');
for (const [path, html] of documents) {
  assert.ok(html.includes('href="/privacy"'), `${path}: internal privacy link`);
  assert.ok(!html.includes('https://blogs.jothivasan.dev/privacy'), `${path}: no external portfolio privacy link`);
}
for (const id of ['hero', 'about', 'projects', 'experience', 'writing']) {
  assert.ok(documents.get('/').includes(`id="${id}"`), `Missing section ${id}`);
}
for (const field of ['name', 'email', 'company', 'message', 'botcheck']) {
  assert.ok(documents.get('/contact').includes(`name="${field}"`), `Missing field ${field}`);
}
for (const [path, destination] of [['/contact/', '/contact'], ['/contact/index.html', '/contact'], ['/index.html', '/']]) {
  const { response } = await read(path);
  assert.ok([307, 308].includes(response.status), `${path}: redirect status`);
  assert.equal(new URL(response.headers.get('location'), origin).pathname, destination);
  console.log(`PASS ${path} → ${destination}`);
}
const checked = new Set();
for (const [path, html] of documents) {
  for (const [, rawHref] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    if (!rawHref.startsWith('/') && !rawHref.startsWith('#')) continue;
    const href = rawHref.replaceAll('&amp;', '&');
    const url = new URL(href, new URL(path, origin));
    if (url.hash && documents.has(url.pathname)) {
      assert.ok(documents.get(url.pathname).includes(`id="${url.hash.slice(1)}"`), `Broken section link ${href}`);
    }
    if (!url.hash && !documents.has(url.pathname) && !checked.has(url.pathname)) {
      assert.equal((await fetch(url)).status, 200, href);
      checked.add(url.pathname);
    }
  }
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/_next\/[^" ]+)"/g)) {
    const url = asset.replaceAll('&amp;', '&');
    if (checked.has(url)) continue;
    assert.equal((await fetch(new URL(url, origin))).status, 200, url);
    checked.add(url);
  }
}
for (const path of ['/logo.svg', '/og.png', '/robots.txt', '/sitemap.xml', '/Jothivasan_FullStackDeveloper_Resume.pdf']) {
  assert.equal((await fetch(new URL(path, origin))).status, 200, path);
}
assert.equal((await read('/does-not-exist')).response.status, 404);
console.log(`PASS internal links, section targets, form fields, ${checked.size} compiled/download assets, public files, optimized image, and 404 handling`);
