// generate-manifest.mjs
import { readdir, writeFile } from 'node:fs/promises';

async function generateManifest(dir) {
  const files = await readdir(dir);
  const mdFiles = files.filter(f => f.endsWith('.md')).sort();
  await writeFile(`${dir}/manifest.json`, JSON.stringify(mdFiles, null, 2));
  console.log(`✅ Manifest created in ${dir}`);
}

// Run for both project and team folders
await generateManifest('./public/content/projects');
await generateManifest('./public/content/teams');