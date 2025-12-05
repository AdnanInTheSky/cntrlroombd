// generate-manifest.mjs
import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

async function generateManifest(dirPath) {
  try {
    const files = await readdir(dirPath);
    const mdFiles = files.filter(f => f.endsWith('.md')).sort();
    const manifestPath = join(dirPath, 'manifest.json');
    await writeFile(manifestPath, JSON.stringify(mdFiles, null, 2), 'utf8');
    console.log(`✅ Manifest generated: ${manifestPath}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`⚠️  Directory not found: ${dirPath}`);
    } else {
      console.error(`❌ Error in ${dirPath}:`, err.message);
      process.exit(1);
    }
  }
}

// Generate manifests inside public/
await generateManifest('./public/content/projects');
await generateManifest('./public/content/teams');