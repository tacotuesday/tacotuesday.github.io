import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const errors = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const files = walk(dist);
const htmlFiles = files.filter((file) => extname(file) === '.html');

function pageRoute(file) {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  return rel.endsWith('/index.html') ? `/${rel.slice(0, -10)}` : `/${rel}`;
}

function targetExists(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidates = [join(dist, clean), join(dist, clean, 'index.html')];
  if (!extname(clean)) candidates.push(join(dist, `${clean}.html`));
  return candidates.some((candidate) => existsSync(candidate));
}

function report(file, message) {
  errors.push(`${relative(dist, file)}: ${message}`);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = pageRoute(file);

  if (!/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']https:\/\//i.test(html)) {
    report(file, 'missing an absolute HTTPS canonical URL.');
  }

  if (
    route.startsWith('/showcase/') &&
    !/<meta\s+name=["']robots["']\s+content=["']noindex, nofollow["']/i.test(html)
  ) {
    report(file, 'showcase page is missing noindex, nofollow.');
  }

  if (!route.startsWith('/showcase/')) {
    for (const blocked of [
      'Example content / layout preview',
      'lorem ipsum',
      'Theme Crafted & Designed',
      'lewis-kang-100daysofcode',
    ]) {
      if (html.toLowerCase().includes(blocked.toLowerCase())) {
        report(file, `production output contains blocked fixture text or asset: ${blocked}`);
      }
    }
  }

  const imageTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  for (const tag of imageTags) {
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1];
    if (!alt?.trim()) report(file, `image ${src ?? '(unknown)'} has blank or missing alt text.`);
  }

  const firstPartyScripts = [...html.matchAll(/<script\b[^>]*\bsrc=["'](\/[^"']+)["']/gi)];
  if (
    firstPartyScripts.length &&
    (route.startsWith('/work/') || route.startsWith('/writing/') || route.startsWith('/archive/'))
  ) {
    report(
      file,
      `content page loads first-party JavaScript: ${firstPartyScripts.map((match) => match[1]).join(', ')}`,
    );
  }

  const attributes = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map(
    (match) => match[1],
  );
  for (const value of attributes) {
    if (/^(?:https?:|mailto:|tel:|data:|#|javascript:)/i.test(value)) continue;
    const url = new URL(value, `https://local.test${route}`);
    if (!targetExists(url.pathname)) report(file, `broken internal reference ${value}`);
    if (url.hash && /\.html$|\/$/.test(url.pathname)) {
      const clean = url.pathname.replace(/^\/+/, '');
      const target = existsSync(join(dist, clean, 'index.html'))
        ? join(dist, clean, 'index.html')
        : join(dist, clean || 'index.html');
      if (
        existsSync(target) &&
        !readFileSync(target, 'utf8').includes(`id="${url.hash.slice(1)}"`)
      ) {
        report(file, `missing fragment target ${value}`);
      }
    }
  }

  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const candidate of match[1].split(',').map((item) => item.trim().split(/\s+/)[0])) {
      if (
        candidate?.startsWith('/') &&
        !targetExists(new URL(candidate, 'https://local.test').pathname)
      ) {
        report(file, `broken responsive image ${candidate}`);
      }
    }
  }
}

for (const file of files.filter((candidate) => /sitemap.*\.xml$/.test(candidate))) {
  if (readFileSync(file, 'utf8').includes('/showcase/')) {
    report(file, 'showcase URL leaked into the sitemap.');
  }
}

for (const feed of ['rss.xml', 'feed.xml']) {
  const path = join(dist, feed);
  if (!existsSync(path)) errors.push(`${feed}: missing feed output.`);
  else if (readFileSync(path, 'utf8').includes('/showcase/')) {
    errors.push(`${feed}: showcase content leaked into RSS.`);
  }
}

if (!existsSync(join(dist, 'sitemap.xml')))
  errors.push('sitemap.xml: missing legacy sitemap alias.');

if (errors.length) {
  console.error(`Built-site validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(
  `Built-site validation passed for ${htmlFiles.length} HTML pages and ${files.length} files.`,
);
