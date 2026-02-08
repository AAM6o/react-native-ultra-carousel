/**
 * @file init command
 * @description Scaffolds a basic carousel component in the user's project
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

import { basicCarouselTemplate } from '../templates/basic-carousel';
import { imageGalleryTemplate } from '../templates/image-gallery';
import { onboardingTemplate } from '../templates/onboarding';

const templates: Record<string, { code: string; filename: string }> = {
  'basic-carousel': { code: basicCarouselTemplate, filename: 'BasicCarousel.tsx' },
  'image-gallery': { code: imageGalleryTemplate, filename: 'ImageGallery.tsx' },
  'onboarding': { code: onboardingTemplate, filename: 'OnboardingCarousel.tsx' },
};

interface InitOptions {
  template: string;
}

export const initCommand = async (options: InitOptions): Promise<void> => {
  const { template } = options;
  const tmpl = templates[template];

  if (!tmpl) {
    console.error(
      chalk.red(`Unknown template "${template}". Available: ${Object.keys(templates).join(', ')}`)
    );
    process.exit(1);
  }

  const outputDir = path.resolve(process.cwd(), 'src', 'components');
  const outputPath = path.join(outputDir, tmpl.filename);

  try {
    await fs.ensureDir(outputDir);
    await fs.writeFile(outputPath, tmpl.code, 'utf-8');

    console.log(chalk.green(`\nCreated ${tmpl.filename} in ${outputDir}`));
    console.log(chalk.dim('\nMake sure you have the dependencies installed:'));
    console.log(chalk.cyan('  yarn add react-native-ultra-carousel react-native-reanimated react-native-gesture-handler'));
    console.log();
  } catch (err) {
    console.error(chalk.red('Failed to create file:'), err);
    process.exit(1);
  }
};
