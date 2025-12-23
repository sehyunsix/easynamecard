#!/usr/bin/env node

/**
 * Theme Migration Script
 *
 * This script automatically extracts theme cases from CardPreview.tsx
 * and creates individual theme component files.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CARD_PREVIEW_PATH = path.join(__dirname, '../components/CardPreview.tsx');
const THEMES_DIR = path.join(__dirname, '../components/themes');
const INDEX_PATH = path.join(THEMES_DIR, 'index.ts');
const REGISTRY_PATH = path.join(THEMES_DIR, 'Registry.tsx');

// Already migrated themes
const MIGRATED_THEMES = new Set([
  'modern',
  'minimal',
  'creative',
  'professional',
  'dark',
  'glassmorphism'
]);

/**
 * Convert theme ID to PascalCase component name
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Extract theme cases from CardPreview.tsx
 */
function extractThemeCases(content) {
  const themes = [];

  // Find switch statement
  const switchMatch = content.match(/switch\s*\(style\.theme\)\s*{([\s\S]*?)case\s+'modern':/);
  if (!switchMatch) {
    console.error('Could not find switch statement');
    return themes;
  }

  const switchContent = switchMatch[1];

  // Match each case
  const caseRegex = /case\s+'([^']+)':\s*return\s*\(([\s\S]*?)\);\s*(?=case\s+'|case\s+"modern"|$)/g;
  let match;

  while ((match = caseRegex.exec(switchContent)) !== null) {
    const themeName = match[1];
    const themeCode = match[2].trim();

    if (!MIGRATED_THEMES.has(themeName)) {
      themes.push({
        id: themeName,
        name: toPascalCase(themeName),
        code: themeCode
      });
    }
  }

  return themes;
}

/**
 * Generate theme component file content
 */
function generateThemeComponent(theme) {
  const { name, code } = theme;

  // Extract used icons from the code
  const iconMatches = code.match(/<(Github|Mail|Phone|MapPin|Globe|Target|Sparkles|Briefcase|ExternalLink|Repeat)[^>]*>/g) || [];
  const usedIcons = [...new Set(iconMatches.map(m => m.match(/<(\w+)/)[1]))];

  const iconImports = usedIcons.length > 0
    ? `import { ${usedIcons.join(', ')} } from 'lucide-react';`
    : '';

  return `import React from 'react';
import { ThemeComponent } from './ThemeTypes';
${iconImports}

export const ${name}: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  ${code}
);
`;
}

/**
 * Update index.ts with new exports
 */
function updateIndexFile(themes) {
  let content = `// Export all theme components\n`;

  // Add existing exports
  const existingThemes = [
    'Modern',
    'Minimal',
    'Creative',
    'Professional',
    'Dark',
    'Glassmorphism'
  ];

  existingThemes.forEach(name => {
    content += `export { ${name} } from './${name}';\n`;
  });

  // Add new exports
  themes.forEach(theme => {
    content += `export { ${theme.name} } from './${theme.name}';\n`;
  });

  content += `\n// Add new themes here as you create them\n`;
  content += `// export { YourNewTheme } from './YourNewTheme';\n`;

  return content;
}

/**
 * Update Registry.tsx with new theme mappings
 */
function updateRegistryFile(themes) {
  const existingMappings = [
    { id: 'modern', name: 'Modern' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'creative', name: 'Creative' },
    { id: 'professional', name: 'Professional' },
    { id: 'dark', name: 'Dark' },
    { id: 'glassmorphism', name: 'Glassmorphism' }
  ];

  const allMappings = [...existingMappings, ...themes.map(t => ({ id: t.id, name: t.name }))];

  let content = `import React from 'react';
import { CardTheme } from '../types';
import { ThemeComponent, ThemeProps } from './ThemeTypes';
import * as Themes from './index';

const themeMap: Partial<Record<CardTheme, ThemeComponent>> = {
`;

  allMappings.forEach(mapping => {
    content += `  '${mapping.id}': Themes.${mapping.name},\n`;
  });

  content += `  // Add more themes here as they are migrated
};

export const renderThemeById = (themeId: CardTheme, props: ThemeProps) => {
  const Component = themeMap[themeId];
  if (Component) {
    return <Component {...props} />;
  }
  // Return null if theme not found (CardPreview will handle fallback)
  return null;
};
`;

  return content;
}

/**
 * Remove migrated cases from CardPreview.tsx
 */
function removeThemeCases(content, themes) {
  let updatedContent = content;

  themes.forEach(theme => {
    // Match and remove the case block
    const casePattern = new RegExp(
      `\\s*case\\s+'${theme.id}':\\s*return\\s*\\([\\s\\S]*?\\);\\s*`,
      'g'
    );
    updatedContent = updatedContent.replace(casePattern, '\n');
  });

  return updatedContent;
}

/**
 * Main migration function
 */
async function migrateThemes() {
  console.log('🚀 Starting theme migration...\n');

  // Read CardPreview.tsx
  console.log('📖 Reading CardPreview.tsx...');
  const cardPreviewContent = fs.readFileSync(CARD_PREVIEW_PATH, 'utf8');

  // Extract themes
  console.log('🔍 Extracting theme cases...');
  const themes = extractThemeCases(cardPreviewContent);
  console.log(`✅ Found ${themes.length} themes to migrate\n`);

  if (themes.length === 0) {
    console.log('✨ No themes to migrate. All done!');
    return;
  }

  // Show themes to be migrated
  console.log('📋 Themes to migrate:');
  themes.forEach((theme, i) => {
    console.log(`   ${i + 1}. ${theme.id} → ${theme.name}.tsx`);
  });
  console.log('');

  // Create theme files
  console.log('📝 Creating theme component files...');
  let created = 0;
  themes.forEach(theme => {
    const filePath = path.join(THEMES_DIR, `${theme.name}.tsx`);
    const content = generateThemeComponent(theme);

    try {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`   ✅ Created ${theme.name}.tsx`);
      created++;
    } catch (error) {
      console.error(`   ❌ Failed to create ${theme.name}.tsx:`, error.message);
    }
  });
  console.log(`\n✅ Created ${created}/${themes.length} theme files\n`);

  // Update index.ts
  console.log('📝 Updating index.ts...');
  try {
    const indexContent = updateIndexFile(themes);
    fs.writeFileSync(INDEX_PATH, indexContent, 'utf8');
    console.log('   ✅ Updated index.ts\n');
  } catch (error) {
    console.error('   ❌ Failed to update index.ts:', error.message);
  }

  // Update Registry.tsx
  console.log('📝 Updating Registry.tsx...');
  try {
    const registryContent = updateRegistryFile(themes);
    fs.writeFileSync(REGISTRY_PATH, registryContent, 'utf8');
    console.log('   ✅ Updated Registry.tsx\n');
  } catch (error) {
    console.error('   ❌ Failed to update Registry.tsx:', error.message);
  }

  // Update CardPreview.tsx (remove migrated cases)
  console.log('📝 Updating CardPreview.tsx (removing migrated cases)...');
  try {
    const updatedCardPreview = removeThemeCases(cardPreviewContent, themes);
    fs.writeFileSync(CARD_PREVIEW_PATH, updatedCardPreview, 'utf8');

    const linesBefore = cardPreviewContent.split('\n').length;
    const linesAfter = updatedCardPreview.split('\n').length;
    const linesRemoved = linesBefore - linesAfter;

    console.log(`   ✅ Updated CardPreview.tsx (removed ${linesRemoved} lines)\n`);
  } catch (error) {
    console.error('   ❌ Failed to update CardPreview.tsx:', error.message);
  }

  // Summary
  console.log('✨ Migration complete!\n');
  console.log('📊 Summary:');
  console.log(`   • Themes migrated: ${created}`);
  console.log(`   • Files created: ${created}`);
  console.log(`   • index.ts: updated`);
  console.log(`   • Registry.tsx: updated`);
  console.log(`   • CardPreview.tsx: updated\n`);

  console.log('🎉 All themes have been migrated to individual files!');
  console.log('💡 Next steps:');
  console.log('   1. Review the generated files');
  console.log('   2. Run linter to check for any issues');
  console.log('   3. Test the themes in your app');
  console.log('   4. Commit the changes\n');
}

// Run migration
migrateThemes().catch(error => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});




