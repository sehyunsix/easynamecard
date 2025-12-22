const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '../components/themes');
const GENERATED_FILE = path.join(__dirname, '../components/themes/themes.generated.ts');

function sync() {
  const files = fs.readdirSync(THEMES_DIR)
    .filter(f => f.endsWith('.tsx') && !['Registry.tsx', 'ThemeTypes.tsx'].includes(f));

  const themes = files.map(f => {
    const componentName = f.replace('.tsx', '');
    const id = componentName.toLowerCase();
    const content = fs.readFileSync(path.join(THEMES_DIR, f), 'utf-8');

    const labelMatch = content.match(/\/\/ @label:\s*(.+)/);
    let label = labelMatch ? labelMatch[1].trim() : componentName;

    return { id, componentName, label };
  });

  themes.sort((a, b) => a.id.localeCompare(b.id));

  const imports = themes.map(t => `import { ${t.componentName} } from './${t.componentName}';`).join('\n');

  const themeType = `export type CardTheme =\n  | ${themes.map(t => `'${t.id}'`).join('\n  | ')};`;

  const themeMap = `export const themeMap: Record<string, any> = {\n${themes.map(t => `  '${t.id}': ${t.componentName},`).join('\n')}\n};`;

  const themeMetadata = `export const themesMetadata: { id: CardTheme; label: string }[] = [\n${themes.map(t => `  { id: '${t.id}', label: '${t.label}' },`).join('\n')}\n];`;

  const fileContent = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.
import { ThemeComponent } from './ThemeTypes';
${imports}

${themeType}

${themeMap}

${themeMetadata}
`;

  fs.writeFileSync(GENERATED_FILE, fileContent);
  console.log(`Successfully generated ${GENERATED_FILE}`);
}

sync();
