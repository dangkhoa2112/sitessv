import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const localeAppDir = path.join(rootDir, 'src', 'app', '[locale]');

const requiredFiles = [
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  'public/llms.txt',
  'src/lib/seo.ts',
  'src/lib/json-ld.ts',
  'src/components/ui/Breadcrumbs.tsx'
];

const listingPages = [
  'src/app/[locale]/services/page.tsx',
  'src/app/[locale]/news/page.tsx',
  'src/app/[locale]/events/page.tsx',
  'src/app/[locale]/research/page.tsx',
  'src/app/[locale]/careers/page.tsx'
];

function toRelative(filePath) {
  return path.relative(rootDir, filePath).split(path.sep).join('/');
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectPageFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectPageFiles(fullPath);
      files.push(...nested);
      continue;
    }

    if (entry.isFile() && entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }

  return files;
}

async function run() {
  const errors = [];

  for (const relativePath of requiredFiles) {
    const fullPath = path.join(rootDir, relativePath);
    if (!(await exists(fullPath))) {
      errors.push(`Missing required SEO/GEO artifact: ${relativePath}`);
    }
  }

  const pageFiles = await collectPageFiles(localeAppDir);

  for (const filePath of pageFiles) {
    const relativePath = toRelative(filePath);
    const content = await readFile(filePath, 'utf8');

    const hasMetadata =
      /export\s+(async\s+)?function\s+generateMetadata/.test(content) ||
      /export\s+const\s+metadata\s*:/.test(content);

    if (!hasMetadata) {
      errors.push(`Missing metadata export: ${relativePath}`);
    }
  }

  const searchPagePath = path.join(rootDir, 'src', 'app', '[locale]', 'search', 'page.tsx');
  if (await exists(searchPagePath)) {
    const searchPageContent = await readFile(searchPagePath, 'utf8');
    if (!/noindex/i.test(searchPageContent)) {
      errors.push('Search page must include noindex directive: src/app/[locale]/search/page.tsx');
    }
  }

  for (const relativePath of listingPages) {
    const fullPath = path.join(rootDir, relativePath);
    if (!(await exists(fullPath))) {
      errors.push(`Missing listing page: ${relativePath}`);
      continue;
    }

    const content = await readFile(fullPath, 'utf8');
    if (!/buildListingPageMetadata/.test(content)) {
      errors.push(`Listing page should use buildListingPageMetadata helper: ${relativePath}`);
    }
  }

  const breadcrumbsPath = path.join(rootDir, 'src', 'components', 'ui', 'Breadcrumbs.tsx');
  if (await exists(breadcrumbsPath)) {
    const breadcrumbsContent = await readFile(breadcrumbsPath, 'utf8');
    if (!/breadcrumbJsonLd/.test(breadcrumbsContent)) {
      errors.push('Breadcrumb component should emit breadcrumbJsonLd structured data.');
    }
  }

  const fragmentsPath = path.join(rootDir, 'src', 'graphql', 'fragments.ts');
  if (await exists(fragmentsPath)) {
    const fragmentsContent = await readFile(fragmentsPath, 'utf8');
    if (!/fragment\s+SeoFields[\s\S]*\bkeywords\b/.test(fragmentsContent)) {
      errors.push('SEO GraphQL fragment should include keywords field.');
    }
  }

  if (errors.length > 0) {
    console.error('\nSEO/GEO audit failed with the following issues:\n');
    for (const issue of errors) {
      console.error(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log('SEO/GEO audit passed. Baseline standards are in place.');
}

run().catch((error) => {
  console.error('SEO/GEO audit failed unexpectedly.');
  console.error(error);
  process.exit(1);
});
