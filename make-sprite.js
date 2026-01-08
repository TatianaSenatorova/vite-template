import fs from "fs";
import path from "path";
import svgstore from "svgstore";
import { optimize } from "svgo";

const iconsPath = "./raw/svg/sprite";
const outDir = "./src/images/sprite";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const sprite = svgstore({ cleanDefs: true });
const files = fs.readdirSync(iconsPath);

for (const file of files) {
  if (!file.endsWith(".svg")) continue;

  const filepath = path.join(iconsPath, file);
  const svg = fs.readFileSync(filepath, "utf8");

  const optimized = optimize(svg, {
    multipass: true,
    plugins: [
      "removeDimensions",
      "cleanupAttrs",
      "removeDoctype",
      "removeComments",
      {
        name: "removeAttrs",
        params: { attrs: "(id)" }
      }
    ]
  });

  const name = path.parse(file).name.toLowerCase();

  sprite.add(name, optimized.data);
}

fs.writeFileSync(path.join(outDir, "stack.svg"), sprite.toString({ pretty: true }));

console.log("Sprite generated: src/images/sprite/stack.svg");
