/*
RUN THIS FROM PROJECT BASE

carbon-components and autoprefixer modules can be removed, but this script will not function without them present
*/

const fs = require("fs");
const sass = require("sass");
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const path = require("path");

(async () => {
//   const scss = fs
//     .readdirSync("css")
//     .filter((file) => file.endsWith(".scss"))
//     .map((file) => path.parse(file));

//   for (const { name, base } of scss) {
//     const file = `css/${base}`;
//     const outFile = `css/${name}.css`;

    const file = 'dev/nord.scss';
    const outFile = 'src/css/nord.css';

    console.log("[build-css]", file, "-->", outFile);

    const { css } = sass.renderSync({
      file,
      outFile,
      outputStyle: "compressed",
      omitSourceMapUrl: true,
      includePaths: ["node_modules"],
    });

    const prefixed = await postcss([
      autoprefixer({
        overrideBrowserslist: ["last 1 version", "ie >= 11", "Firefox ESR"],
      }),
    ]).process(css, { from: undefined });

    fs.writeFileSync(outFile, prefixed.css);
  }
)();
