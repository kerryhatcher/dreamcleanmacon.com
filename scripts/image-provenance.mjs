import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const sources = JSON.parse(await readFile('.impeccable/asset-sources.json', 'utf8'));
const interior = JSON.parse(await readFile('.impeccable/build/interior-prompt.json', 'utf8'));
const prompts = new Map(sources.map(source => [path.parse(source.file).name, source.origin]));
prompts.set('tranquil-home', interior.prompt);

// WebP optimization drops source metadata; keep its provenance alongside each output.
for (const file of await readdir('dist/_astro')) {
  if (!file.endsWith('.webp')) continue;
  const prompt = prompts.get(file.split('.')[0]);
  if (!prompt) throw new Error(`Missing image source record for ${file}`);
  await writeFile(path.join('dist/_astro', `${file}.json`), JSON.stringify({ prompt }, null, 2) + '\n');
}
