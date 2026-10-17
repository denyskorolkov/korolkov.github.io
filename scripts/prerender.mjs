// Writes the rendered HTML of each page into its built index.html, so the
// text is in the page before any JavaScript runs (crawlers, link previews,
// first paint). Runs after `vite build` and the SSR build of entry-server.
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const { render } = await import(pathToFileURL(resolve('.ssr-build/entry-server.js')).href);

const pages = [
  ['home', 'docs/index.html'],
  ['notes', 'docs/notes/index.html']
];

for (const [page, file] of pages) {
  const html = await readFile(file, 'utf8');
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error(`No empty root in ${file}`);
  await writeFile(file, html.replace(marker, `<div id="root">${render(page)}</div>`));
  console.log(`prerendered ${file}`);
}
