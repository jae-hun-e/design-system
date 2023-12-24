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
    const selector = ":root";
    if (key === "colors") {
      Object.entries(value.$static).forEach(([colorKey, colorValue]) => {
        if (colorKey === "light") {
          return cssString.push(`${selector} {\n${cssVariables(colorValue)}\n}`);
        }
        if (colorKey === "dark") {
          const selectorDark = selector + " .theme-dark";
          return cssString.push(`${selectorDark} {\n${cssVariables(colorValue)}\n}`);
        }
        return;
      });
      return;
    }

    return cssString.push(`${selector} {\n${cssVariables(value)}\n}`);
  });
  return cssString;
};

// 만들 형식 : theme.css
// :heading-xl {
// font-size: 3rem;
// font-weight: 700;
// line-height: 100%;
// }

const generateThemeClasses = () => {
  const cssString = [];

  Object.entries(theme.classes).forEach(([, value]) => {
    const cssClasses = Object.entries(value)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(([subKey, subValue]) => {
            const className = `.${toCssCasting(mainKey)}-${toCssCasting(subKey)}`;

            const styleProperties = Object.entries(subValue)
              .map(
                ([styleKey, styleValue]) => `${toCssCasting(styleKey)}: ${styleValue};`
              )
              .join("\n");

            return `${className} {\n${styleProperties}\n}`;
          })
          .join("\n")
      )
      .join("\n");

    cssString.push(cssClasses);
  });
  return cssString;
};

const generateThemeCSS = () => {
  const variables = generateThemeCssVariables();

  const classes = generateThemeClasses();
  fs.writeFileSync("dist/themes.css", [...variables, ...classes].join("\n"));
};

generateThemeCSS();
