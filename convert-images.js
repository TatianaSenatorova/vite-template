import fs from "fs";
import path from "path";
import sharp from "sharp";

const rawPath = "./raw/img";
const outPath = "./src/images";

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

const files = fs.readdirSync(rawPath);

async function processImages() {
  for (const file of files) {
    const input = path.join(rawPath, file);
    const parsed = path.parse(file);
    const basename = parsed.name;
    const ext = parsed.ext.toLowerCase();

    if (![".png", ".jpg", ".jpeg"].includes(ext)) {
      continue;
    }

    const metadata = await sharp(input).metadata();
    const width = metadata.width;

    if (!width) {
      continue;
    }

    const oneXWidth = Math.round(width / 2);
    const baseExt = ext === ".jpeg" ? ".jpg" : ext;

    const twoXOriginalPath = `${outPath}/${basename}@2x${baseExt}`;
    const oneXOriginalPath = `${outPath}/${basename}@1x${baseExt}`;
    const twoXWebpPath = `${outPath}/${basename}@2x.webp`;
    const oneXWebpPath = `${outPath}/${basename}@1x.webp`;

    if (baseExt === ".png") {
      fs.copyFileSync(input, twoXOriginalPath);

      await sharp(input)
        .resize({ width: oneXWidth })
        .png()
        .toFile(oneXOriginalPath);

      await sharp(input)
        .webp({ quality: 80 })
        .toFile(twoXWebpPath);

      await sharp(input)
        .resize({ width: oneXWidth })
        .webp({ quality: 80 })
        .toFile(oneXWebpPath);
    }

    if (baseExt === ".jpg") {
      await sharp(input)
        .jpeg({ progressive: true, quality: 85 })
        .toFile(twoXOriginalPath);

      await sharp(input)
        .resize({ width: oneXWidth })
        .jpeg({ progressive: true, quality: 85 })
        .toFile(oneXOriginalPath);

      await sharp(input)
        .webp({ quality: 80 })
        .toFile(twoXWebpPath);

      await sharp(input)
        .resize({ width: oneXWidth })
        .webp({ quality: 80 })
        .toFile(oneXWebpPath);
    }

    console.log(
      `Готово: ${basename} → @1x/${baseExt}, @2x/${baseExt}, @1x.webp, @2x.webp`
    );
  }

  console.log("Все изображения обработаны!");
}

processImages().catch((err) => {
  console.error("Ошибка при обработке изображений:", err);
});
