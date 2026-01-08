import fs from "fs";
import path from "path";
import { optimize } from "svgo";

const inlinePath = "./raw/svg/inline";
const outPath = "./src/images";

if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath, { recursive: true });
}

const files = fs.readdirSync(inlinePath);

for (const file of files) {
  if (!file.endsWith(".svg")) continue;

  const input = path.join(inlinePath, file);
  const output = path.join(outPath, file);

  const svgData = fs.readFileSync(input, "utf8");
  const result = optimize(svgData, {
    multipass: true,
    plugins: [
      "cleanupAttrs",
      "removeDoctype",
      "removeComments"
    ]
  });

  fs.writeFileSync(output, result.data);
  console.log(`SVG optimized: ${file}`);
}

console.log("Все одиночные SVG оптимизированы!");
