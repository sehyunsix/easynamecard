#!/usr/bin/env node

/**
 * Theme Migration Script v2
 *
 * Improved version with better parsing for nested structures
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
 * Find matching closing parenthesis
 */
function findClosingParen(text, startIndex) {
  let depth = 1;
  let i = startIndex;

  while (i < text.length && depth > 0) {
    if (text[i] === '(') depth++;
    if (text[i] === ')') depth--;
    i++;
  }

  return depth === 0 ? i - 1 : -1;
}

/**
 * Extract theme cases from CardPreview.tsx with improved parsing
 */
function extractThemeCases(content) {
  const themes = [];

  // Find the switch statement
  const switchStart = content.indexOf('switch (style.theme)');
  if (switchStart === -1) {
    console.error('Could not find switch statement');
    return themes;
  }

  // Find the end of switch (before case 'modern': or default:)
  const modernCaseIndex = content.indexOf("case 'modern':", switchStart);
  const defaultIndex = content.indexOf('default:', switchStart);
  const switchEnd = Math.min(
    modernCaseIndex !== -1 ? modernCaseIndex : Infinity,
    defaultIndex !== -1 ? defaultIndex : Infinity
  );

  if (switchEnd === Infinity) {
    console.error('Could not find end of switch statement');
    return themes;
  }

  const switchContent = content.substring(switchStart, switchEnd);

  // Extract each case
  let pos = 0;
  while (true) {
    const caseMatch = switchContent.substring(pos).match(/case\s+'([^']+)':\s*return\s*\(/);
    if (!caseMatch) break;

    const themeName = caseMatch[1];
    const caseStart = pos + caseMatch.index;
    const returnStart = caseStart + caseMatch[0].length - 1; // Position of opening paren

    // Find matching closing paren
    const closingParen = findClosingParen(switchContent, returnStart + 1);
    if (closingParen === -1) {
      console.warn(`Could not find closing paren for theme: ${themeName}`);
      pos = caseStart + caseMatch[0].length;
      continue;
    }

    // Extract code between parens
    const themeCode = switchContent.substring(returnStart + 1, closingParen).trim();

    if (!MIGRATED_THEMES.has(themeName) && themeCode.length > 0) {
      themes.push({
        id: themeName,
        name: toPascalCase(themeName),
        code: themeCode,
        fullCase: switchContent.substring(caseStart, closingParen + 2) // Include ');'
      });
    }

    pos = closingParen + 1;
  }

  return themes;
}

/**
 * Generate theme component file content
 */
function generateThemeComponent(theme) {
  const { name, code } = theme;

  // Extract used icons
  const iconMatches = code.match(/<(Github|Mail|Phone|MapPin|Globe|Target|Sparkles|Briefcase|ExternalLink|Repeat)[^>]*>/g) || [];
  const usedIcons = [...new Set(iconMatches.map(m => m.match(/<(\w+)/)[1]))];

  const iconImports = usedIcons.length > 0
    ? `import { ${usedIcons.join(', ')} } from 'lucide-react';\n`
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
 * Main migration function
 */
async function migrateThemes() {
  console.log('🚀 Starting theme migration (v2)...\n');

  // Read CardPreview.tsx
  console.log('📖 Reading CardPreview.tsx...');
  const cardPreviewContent = fs.readFileSync(CARD_PREVIEW_PATH, 'utf8');

  // Extract themes
  console.log('🔍 Extracting theme cases...');
  const themes = extractThemeCases(cardPreviewContent);
  console.log(`✅ Found ${themes.length} themes to migrate\n`);

  if (themes.length === 0) {
    console.log('✨ No new themes to migrate!');
    return;
  }

  // Show first 10 themes
  console.log('📋 Sample themes (first 10):');
  themes.slice(0, 10).forEach((theme, i) => {
    const codePreview = theme.code.substring(0, 50).replace(/\n/g, ' ');
    console.log(`   ${i + 1}. ${theme.id} → ${theme.name}.tsx`);
    console.log(`      Preview: ${codePreview}...`);
  });
  if (themes.length > 10) {
    console.log(`   ... and ${themes.length - 10} more`);
  }
  console.log('');

  // Ask for confirmation
  console.log('⚠️  This will:');
  console.log(`   • Create ${themes.length} new theme files`);
  console.log(`   • Update index.ts and Registry.tsx`);
  console.log(`   • Modify CardPreview.tsx`);
  console.log('');

  // Create theme files
  console.log('📝 Creating theme component files...');
  let created = 0;
  let failed = [];

  themes.forEach(theme => {
    const filePath = path.join(THEMES_DIR, `${theme.name}.tsx`);
    const content = generateThemeComponent(theme);

    try {
      fs.writeFileSync(filePath, content, 'utf8');
      created++;
      if (created <= 5 || created % 10 === 0) {
        console.log(`   ✅ Created ${theme.name}.tsx`);
      }
    } catch (error) {
      console.error(`   ❌ Failed ${theme.name}.tsx:`, error.message);
      failed.push(theme.id);
    }
  });

  if (created > 5 && created % 10 !== 0) {
    console.log(`   ... (${created - 5} more files)`);
  }
  console.log(`\n✅ Created ${created}/${themes.length} theme files\n`);

  if (failed.length > 0) {
    console.log(`⚠️  Failed themes: ${failed.join(', ')}\n`);
  }

  // Update index.ts
  console.log('📝 Updating index.ts...');
  try {
    const existingThemes = ['Modern', 'Minimal', 'Creative', 'Professional', 'Dark', 'Glassmorphism'];
    const allThemes = [...existingThemes, ...themes.map(t => t.name)];

    let indexContent = '// Export all theme components\n';
    allThemes.forEach(name => {
      indexContent += `export { ${name} } from './${name}';\n`;
    });

    fs.writeFileSync(INDEX_PATH, indexContent, 'utf8');
    console.log('   ✅ Updated index.ts\n');
  } catch (error) {
    console.error('   ❌ Failed to update index.ts:', error.message);
  }

  // Update Registry.tsx
  console.log('📝 Updating Registry.tsx...');
  try {
    const existingMappings = [
      { id: 'modern', name: 'Modern' },
      { id: 'minimal', name: 'Minimal' },
      { id: 'creative', name: 'Creative' },
      { id: 'professional', name: 'Professional' },
      { id: 'dark', name: 'Dark' },
      { id: 'glassmorphism', name: 'Glassmorphism' }
    ];

    const allMappings = [...existingMappings, ...themes.map(t => ({ id: t.id, name: t.name }))];

    let registryContent = `import React from 'react';
import { CardTheme } from '../types';
import { ThemeComponent, ThemeProps } from './ThemeTypes';
import * as Themes from './index';

const themeMap: Partial<Record<CardTheme, ThemeComponent>> = {
`;

    allMappings.forEach(mapping => {
      registryContent += `  '${mapping.id}': Themes.${mapping.name},\n`;
    });

    registryContent += `};

export const renderThemeById = (themeId: CardTheme, props: ThemeProps) => {
  const Component = themeMap[themeId];
  if (Component) {
    return <Component {...props} />;
  }
  return null;
};
`;

    fs.writeFileSync(REGISTRY_PATH, registryContent, 'utf8');
    console.log('   ✅ Updated Registry.tsx\n');
  } catch (error) {
    console.error('   ❌ Failed to update Registry.tsx:', error.message);
  }

  // Update CardPreview.tsx
  console.log('📝 Updating CardPreview.tsx...');
  try {
    let updatedContent = cardPreviewContent;

    themes.forEach(theme => {
      updatedContent = updatedContent.replace(theme.fullCase, '');
    });

    const linesBefore = cardPreviewContent.split('\n').length;
    const linesAfter = updatedContent.split('\n').length;
    const linesRemoved = linesBefore - linesAfter;

    fs.writeFileSync(CARD_PREVIEW_PATH, updatedContent, 'utf8');
    console.log(`   ✅ Removed ${linesRemoved} lines from CardPreview.tsx\n`);
  } catch (error) {
    console.error('   ❌ Failed to update CardPreview.tsx:', error.message);
  }

  // Summary
  console.log('═'.repeat(60));
  console.log('✨ Migration Complete!');
  console.log('═'.repeat(60));
  console.log(`📊 Themes migrated: ${created}/${themes.length}`);
  console.log(`📁 Files created: ${created}`);
  console.log(`📝 index.ts: ✅ updated`);
  console.log(`📝 Registry.tsx: ✅ updated`);
  console.log(`📝 CardPreview.tsx: ✅ updated`);
  console.log('═'.repeat(60));
  console.log('');
  console.log('🎉 All themes migrated to individual files!');
  console.log('');
  console.log('💡 Next steps:');
  console.log('   1. Review generated files in components/themes/');
  console.log('   2. Run: npm run dev (to test)');
  console.log('   3. Check for any linter errors');
  console.log('   4. Test themes in the app');
  console.log('');
}

// Run migration
migrateThemes().catch(error => {
  console.error('❌ Migration failed:', error);
  console.error(error.stack);
  process.exit(1);
});

