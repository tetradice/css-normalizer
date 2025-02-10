import postcss from "postcss";
import safeParser from "postcss-safe-parser";
import * as sass from "sass";
import * as prettier from "prettier";

// CSS/SCSSをパースしてネスト形式またはフラット形式に変換
async function parseSCSS(
  content: string,
  nested: boolean
): Promise<Record<string, any>> {
  const root = await postcss().process(compileSCSS(content), {
    parser: safeParser,
  });
  const styles: Record<string, any> = {};

  root.root.walkRules((rule) => {
    const selectors = rule.selector.split(",").map((s) => s.trim());
    const declarations: Record<string, string> = {};

    rule.walkDecls((decl) => {
      declarations[decl.prop] = decl.value;
    });

    for (const selector of selectors) {
      if (nested) {
        addToNestedStructure(styles, selector.split(" "), declarations);
      } else {
        styles[selector] = { ...(styles[selector] || {}), ...declarations };
      }
    }
  });

  return styles;
}

// ネスト可能な構造を再帰的に作成
function addToNestedStructure(
  obj: Record<string, any>,
  selectors: string[],
  declarations: Record<string, string>
) {
  if (selectors.length === 0) return;

  const key = selectors[0];
  if (!obj[key]) obj[key] = {};

  if (selectors.length === 1) {
    obj[key] = { ...(obj[key] || {}), ...declarations };
  } else {
    addToNestedStructure(obj[key], selectors.slice(1), declarations);
  }
}

// SCSSをCSSに変換
function compileSCSS(content: string): string {
  return sass.compileString(content).css;
}

// ネスト構造をSCSS文字列に変換
function scssStringify(styles: Record<string, any>, depth = 0): string {
  let scss = "";
  const indent = "  ".repeat(depth);

  for (const selector in styles) {
    if (typeof styles[selector] === "object") {
      scss += `${indent}${selector} {
`;
      scss += scssStringify(styles[selector], depth + 1);
      scss += `${indent}}
`;
    } else {
      scss += `${indent}${selector}: ${styles[selector]};
`;
    }
  }
  return scss;
}

// フラットなCSS文字列に変換
function cssStringify(styles: Record<string, any>): string {
  let css = "";

  for (const selector in styles) {
    css += `${selector} {
`;
    for (const prop in styles[selector]) {
      css += `  ${prop}: ${styles[selector][prop]};
`;
    }
    css += `}

`;
  }

  return css;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const compiled = await parseSCSS(body.source, true);
  const scssText = scssStringify(compiled);
  const scssFormattedText = await prettier.format(scssText, { parser: "scss" });

  return {
    result: scssFormattedText,
  };
});
