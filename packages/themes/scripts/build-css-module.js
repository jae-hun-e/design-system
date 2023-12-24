import * as theme from "../dist/index.js";
import fs from "fs";

// 만들 형식 : theme.css
// :root {
//   --gray-900: #171923
// }

// 정규표현식으로 카멜케이스 => 변경
const toCssCasting = (str) => {
  return str
    .replace(/([a-z])(\d)/, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
};

// 원하는 형태로 key : value 매핑
const cssVariables = (colorValue) =>
  Object.entries(colorValue)
    .map(([mainKey, mainValue]) =>
      Object.entries(mainValue)
        .map(
          ([subKey, subValue]) =>
            `--${toCssCasting(mainKey)}-${toCssCasting(subKey)}: ${subValue};`
        )
        .join("\n")
    )
    .join("\n");

const generateThemeCssVariables = () => {
  const cssString = [];

  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          const selector = ":root";
          return cssString.push(`${selector} {\n${cssVariables(colorValue)}\n}`);
        }
        if (colorKey === "dark") {
          const selector = ":root .theme-dark";
          return cssString.push(`${selector} {\n${cssVariables(colorValue)}\n}`);
        }
      });
    }
  });
  return cssString;
};

const generateThemeCss = () => {
  const variables = generateThemeCssVariables();
  fs.writeFileSync("dist/themes.css", [...variables].join("\n"));
};

generateThemeCss();
