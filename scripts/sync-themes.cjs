const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(__dirname, '../components/themes');
const TYPES_FILE = path.join(__dirname, '../types.ts');
const REGISTRY_FILE = path.join(__dirname, '../components/themes/Registry.tsx');
const INDEX_FILE = path.join(__dirname, '../components/themes/index.ts');
const EDITOR_PANEL_FILE = path.join(__dirname, '../components/EditorPanel.tsx');

function sync() {
  const files = fs.readdirSync(THEMES_DIR)
    .filter(f => f.endsWith('.tsx') && !['Registry.tsx', 'ThemeTypes.tsx'].includes(f));

  const themes = files.map(f => {
    const componentName = f.replace('.tsx', '');
    const id = componentName.toLowerCase();
    const content = fs.readFileSync(path.join(THEMES_DIR, f), 'utf-8');

    // Extract label from // @label: ...
    const labelMatch = content.match(/\/\/ @label:\s*(.+)/);
    let label = labelMatch ? labelMatch[1].trim() : componentName;

    return { id, componentName, label };
  });

  // Sort by id for consistency
  themes.sort((a, b) => a.id.localeCompare(b.id));

  // 1. Update index.ts
  const indexContent = themes.map(t => `export { ${t.componentName} } from './${t.componentName}';`).join('\n') + '\n';
  fs.writeFileSync(INDEX_FILE, `// Export all theme components\n${indexContent}`);
  console.log('Updated components/themes/index.ts');

  // 2. Update Registry.tsx
  let registryContent = fs.readFileSync(REGISTRY_FILE, 'utf-8');
  const themeMapStartMarker = 'const themeMap: Partial<Record<CardTheme, ThemeComponent>> = {';
  const themeMapEndMarker = '};';

  const startIndex = registryContent.indexOf(themeMapStartMarker);
  const endIndex = registryContent.indexOf(themeMapEndMarker, startIndex);

  if (startIndex !== -1 && endIndex !== -1) {
    const newThemeMap = themes.map(t => `  '${t.id}': Themes.${t.componentName},`).join('\n');
    registryContent = registryContent.slice(0, startIndex + themeMapStartMarker.length) +
                      '\n' + newThemeMap + '\n' +
                      registryContent.slice(endIndex);
    fs.writeFileSync(REGISTRY_FILE, registryContent);
    console.log('Updated components/themes/Registry.tsx');
  }

  // 3. Update types.ts
  let typesContent = fs.readFileSync(TYPES_FILE, 'utf-8');
  const cardThemeTypeRegex = /export type CardTheme =[\s\S]*?;/;
  const newCardThemeType = `export type CardTheme =\n  | ${themes.map(t => `'${t.id}'`).join('\n  | ')};`;
  typesContent = typesContent.replace(cardThemeTypeRegex, newCardThemeType);
  fs.writeFileSync(TYPES_FILE, typesContent);
  console.log('Updated types.ts');

  // 4. Update EditorPanel.tsx
  let editorPanelContent = fs.readFileSync(EDITOR_PANEL_FILE, 'utf-8');

  // Extract existing labels from EditorPanel.tsx to preserve them if not provided via comment
  const themesArrayRegex = /const themes: { id: CardTheme; label: string }\[] = \[([\s\S]*?)];/;
  const match = editorPanelContent.match(themesArrayRegex);
  const existingLabels = {};
  if (match) {
    const arrayBody = match[1];
    const itemRegex = /{ id: '(.+?)', label: '(.+?)' }/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(arrayBody)) !== null) {
      existingLabels[itemMatch[1]] = itemMatch[2];
    }
  }

  const newThemesArray = themes.map(t => {
    const finalLabel = existingLabels[t.id] || t.label;
    return `    { id: '${t.id}', label: '${finalLabel}' },`;
  }).join('\n');

  editorPanelContent = editorPanelContent.replace(themesArrayRegex,
    `const themes: { id: CardTheme; label: string }[] = [\n${newThemesArray}\n  ];`);

  fs.writeFileSync(EDITOR_PANEL_FILE, editorPanelContent);
  console.log('Updated components/EditorPanel.tsx');
}

sync();

