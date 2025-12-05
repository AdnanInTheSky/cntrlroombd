import { readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Generates a manifest.json file listing all .md files in a directory.
 * @param {string} dirPath - Absolute or relative path to the content directory
 */
async function generateManifest(dirPath) {
  try {
    const files = await readdir(dirPath);
    const mdFiles = files
      .filter(file => file.endsWith('.md'))
      .sort(); // Optional: sort alphabetically

    const manifestPath = join(dirPath, 'manifest.json');
    await writeFile(manifestPath, JSON.stringify(mdFiles, null, 2), 'utf8');
    console.log(`✅ Manifest generated: ${manifestPath} with ${mdFiles.length} files`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`⚠️  Skipped missing directory: ${dirPath}`);
    } else {
      console.error(`❌ Failed to generate manifest for ${dirPath}:`, err.message);
      throw err;
    }
  }
}

// Generate manifests for projects and teams inside public/
await generateManifest('./public/content/projects');
await generateManifest('./public/content/teams');

console.log('✨ Build completed successfully.');