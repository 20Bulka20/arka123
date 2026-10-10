import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  adverts,
  logos,
  mediaSrc,
  photos,
  targetWidths,
  type MediaAsset,
  type MediaFolder,
} from "../data/assets.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

interface Job {
  folder: MediaFolder;
  asset: MediaAsset;
}

interface ManifestFile {
  slug: string;
  width: number;
  format: "avif" | "webp";
  bytes: number;
  src: string;
}

const jobs: Job[] = [
  ...photos.map((asset) => ({ folder: "photos" as const, asset })),
  ...logos.map((asset) => ({ folder: "logos" as const, asset })),
  ...adverts.map((asset) => ({ folder: "advert" as const, asset })),
];

async function encode(job: Job): Promise<ManifestFile[]> {
  if (job.asset.duplicateOf) {
    return [];
  }

  const sourcePath = path.join(root, "media", "originals", job.folder, job.asset.source);
  const outDir = path.join(root, "public", "media", job.folder);
  await mkdir(outDir, { recursive: true });

  const widths = targetWidths(job.asset.width);
  const written: ManifestFile[] = [];

  for (const width of widths) {
    const pipeline = sharp(sourcePath).rotate().resize({
      width,
      withoutEnlargement: true,
    });

    const avif = await pipeline.clone().avif({ quality: 50, effort: 4 }).toBuffer();
    const webp = await pipeline.clone().webp({ quality: 78, effort: 4 }).toBuffer();

    const avifName = `${job.asset.slug}-${width}.avif`;
    const webpName = `${job.asset.slug}-${width}.webp`;
    await writeFile(path.join(outDir, avifName), avif);
    await writeFile(path.join(outDir, webpName), webp);

    written.push(
      {
        slug: job.asset.slug,
        width,
        format: "avif",
        bytes: avif.length,
        src: mediaSrc(job.folder, job.asset.slug, width, "avif"),
      },
      {
        slug: job.asset.slug,
        width,
        format: "webp",
        bytes: webp.length,
        src: mediaSrc(job.folder, job.asset.slug, width, "webp"),
      },
    );
  }

  return written;
}

async function runPool(pending: Job[], limit: number): Promise<ManifestFile[]> {
  const queue = [...pending];
  const files: ManifestFile[] = [];

  async function worker(): Promise<void> {
    while (queue.length > 0) {
      const job = queue.shift();
      if (!job) {
        return;
      }
      const encoded = await encode(job);
      files.push(...encoded);
      process.stdout.write(`${job.asset.slug}\n`);
    }
  }

  await Promise.all(Array.from({ length: limit }, () => worker()));
  return files;
}

const files = await runPool(jobs, 3);
files.sort((left, right) => left.src.localeCompare(right.src));

const manifest = {
  generatedAt: new Date().toISOString(),
  fileCount: files.length,
  bytes: files.reduce((sum, file) => sum + file.bytes, 0),
  files,
};

await mkdir(path.join(root, "data"), { recursive: true });
await writeFile(
  path.join(root, "data", "media-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

process.stdout.write(
  `wrote ${files.length} files, ${Math.round(manifest.bytes / 1024)} KB\n`,
);
