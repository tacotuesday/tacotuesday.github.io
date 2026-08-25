import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import matter from 'gray-matter';

const root = resolve(import.meta.dirname, '..');
const contentRoot = join(root, 'src', 'content');
const publicRoot = join(root, 'public');
const errors = [];
const forbiddenPublishedPatterns = [
  [/lorem\s+ipsum/i, 'lorem ipsum'],
  [/example\s+metric/i, 'example metric'],
  [/https?:\/\/(?:www\.)?example\.(?:com|org|net)/i, 'placeholder URL'],
  [/\b(?:TBD|TODO)\b/, 'TBD/TODO marker'],
  [/\breplace (?:me|this|with)\b/i, 'replacement marker'],
  [/your[-_ ](?:url|username|project)/i, 'template marker'],
];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : ['.md', '.mdx'].includes(extname(path)) ? [path] : [];
  });
}

function report(file, message) {
  errors.push(`${relative(root, file)}: ${message}`);
}

function validateLinkValues(file, value, keyPath = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => validateLinkValues(file, item, [...keyPath, String(index)]));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const path = [...keyPath, key];
    if (/(?:url|link|repository|demo|documentation|release)$/i.test(key)) {
      if (child === '' || child === null) {
        report(file, `${path.join('.')} is a blank link; remove it or provide a real URL.`);
      }
      if (typeof child === 'string' && /example\.(com|org|net)|localhost|\.invalid/i.test(child)) {
        report(file, `${path.join('.')} uses a placeholder URL.`);
      }
    }
    validateLinkValues(file, child, path);
  }
}

function checkAsset(file, path, label) {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    report(file, `${label} must be a root-relative public asset path.`);
    return;
  }
  if (!existsSync(join(publicRoot, path))) report(file, `${label} is missing: ${path}`);
}

for (const file of walk(contentRoot)) {
  const raw = readFileSync(file, 'utf8');
  let parsed;
  try {
    parsed = matter(raw);
  } catch (error) {
    report(file, `front matter could not be parsed: ${error.message}`);
    continue;
  }

  const { data, content } = parsed;
  const publishDate = data.published ? new Date(data.published) : null;
  const isPublished = data.draft === false && publishDate && publishDate <= new Date();
  if (!isPublished) continue;

  const expectedSlug = basename(file, extname(file));
  if (data.slug !== expectedSlug) {
    report(file, `slug "${data.slug}" must match the filename "${expectedSlug}".`);
  }

  for (const [pattern, name] of forbiddenPublishedPatterns) {
    if (pattern.test(raw)) report(file, `published content contains a ${name}.`);
  }
  if (/\]\(\s*\)/.test(content) || /href=["']\s*["']/.test(content)) {
    report(file, 'published body contains a blank link.');
  }

  validateLinkValues(file, data);

  const markdownImages = [...content.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g)];
  for (const match of markdownImages) {
    const [, alt, src] = match;
    if (!alt?.trim()) report(file, `body image ${src} is missing alt text.`);
    if (src?.startsWith('/')) checkAsset(file, src, 'body image');
    else if (src && !/^https?:/.test(src) && !existsSync(resolve(dirname(file), src))) {
      report(file, `body image is missing: ${src}`);
    }
  }

  if (relative(contentRoot, file).split(/[\\/]/)[0] === 'projects') {
    for (const [key, label] of [
      ['cover', 'cover image'],
      ['screenshot', 'screenshot'],
      ['architecture', 'architecture image'],
    ]) {
      const image = data[key];
      if (!image || typeof image !== 'object') {
        report(file, `published project is missing its ${label}.`);
        continue;
      }
      checkAsset(file, image.image, label);
      if (typeof image.alt !== 'string' || image.alt.trim().length < 12) {
        report(file, `${label} needs descriptive alt text.`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Content validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log('Content validation passed. Published entries contain no blocked fixture values.');
