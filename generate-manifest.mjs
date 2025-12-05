import { readdir, writeFile } from 'node:fs/promises';

async function generateManifest(dirPath, outputFile) {
  try {
    const files = await readdir(dirPath);
    const mdFiles = files
      .filter(f => f.endsWith('.md'))
      .sort();
    await writeFile(outputFile, JSON.stringify(mdFiles, null, 2));
    console.log(`✅ ${outputFile} generated with:`, mdFiles);
  } catch (err) {
    console.warn(`⚠️  Skipped ${dirPath}:`, err.message);
  }
}

// Generate both manifests
await generateManifest('./content/projects', './content/projects/manifest.json');
await generateManifest('./content/teams', './content/teams/manifest.json');