/**
 * @file add command
 * @description Generates example code for a specific animation preset
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

const ALL_PRESETS = [
  'slide', 'fade', 'slide-fade', 'scale', 'scale-fade',
  'vertical', 'vertical-fade', 'parallax', 'overlap', 'peek',
  'stack', 'tinder', 'coverflow', 'cube', 'flip',
  'wheel', 'accordion', 'zoom', 'rotate', 'depth',
  'newspaper', 'origami', 'carousel-3d', 'wave', 'spiral',
  'glitch', 'morph', 'shutter', 'domino', 'elastic',
  'blur-slide', 'windmill', 'film-strip', 'helix', 'gravity',
];

const toPascalCase = (str: string): string =>
  str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');

const generatePresetExample = (preset: string): string => {
  const componentName = `${toPascalCase(preset)}CarouselExample`;

  return `import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Carousel } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DATA = [
  { id: '1', title: 'First', color: '#FF6B6B' },
  { id: '2', title: 'Second', color: '#4ECDC4' },
  { id: '3', title: 'Third', color: '#45B7D1' },
  { id: '4', title: 'Fourth', color: '#96CEB4' },
  { id: '5', title: 'Fifth', color: '#FFEAA7' },
];

export const ${componentName} = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${toPascalCase(preset)} Preset</Text>
      <Carousel
        data={DATA}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color }]}>
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        )}
        preset="${preset}"
        width={SCREEN_WIDTH - 40}
        height={220}
        pagination
        gap={12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
});
`;
};

interface AddOptions {
  dir: string;
}

export const addCommand = async (preset: string, options: AddOptions): Promise<void> => {
  if (!ALL_PRESETS.includes(preset)) {
    console.error(chalk.red(`Unknown preset "${preset}".`));
    console.log(chalk.dim(`Available presets: ${ALL_PRESETS.join(', ')}`));
    process.exit(1);
  }

  const outputDir = path.resolve(process.cwd(), options.dir);
  const filename = `${toPascalCase(preset)}CarouselExample.tsx`;
  const outputPath = path.join(outputDir, filename);

  try {
    await fs.ensureDir(outputDir);
    await fs.writeFile(outputPath, generatePresetExample(preset), 'utf-8');

    console.log(chalk.green(`\nCreated ${filename} in ${outputDir}`));
    console.log(chalk.dim(`\nUsage: import { ${toPascalCase(preset)}CarouselExample } from './${toPascalCase(preset)}CarouselExample';`));
    console.log();
  } catch (err) {
    console.error(chalk.red('Failed to create file:'), err);
    process.exit(1);
  }
};
