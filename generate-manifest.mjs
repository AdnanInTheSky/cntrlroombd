// generate-manifest.mjs
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

async function generateManifest(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
    const files = await readdir(dirPath);
    const mdFiles = files.filter(f => f.endsWith('.md')).sort();
    await writeFile(join(dirPath, 'manifest.json'), JSON.stringify(mdFiles, null, 2));
    console.log(`✅ Manifest created in ${dirPath}`);
  } catch (err) {
    console.warn(`⚠️ Failed to process ${dirPath}:`, err.message);
  }
}

// Generate manifests in content folders
await generateManifest('./content/projects');
await generateManifest('./content/teams');