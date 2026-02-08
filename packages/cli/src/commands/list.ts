/**
 * @file list command
 * @description Lists all available animation presets with descriptions
 */

import chalk from 'chalk';

interface PresetInfo {
  name: string;
  description: string;
  difficulty: string;
  category: 'basic' | 'advanced' | 'creative';
}

const PRESETS: PresetInfo[] = [
  { name: 'slide', description: 'Standard horizontal slide', difficulty: 'Easy', category: 'basic' },
  { name: 'fade', description: 'Crossfade between stacked items', difficulty: 'Easy', category: 'basic' },
  { name: 'slide-fade', description: 'Slide + opacity fade combo', difficulty: 'Easy', category: 'basic' },
  { name: 'scale', description: 'Active item scales up, neighbors shrink', difficulty: 'Easy', category: 'basic' },
  { name: 'scale-fade', description: 'Scale + opacity combo', difficulty: 'Easy', category: 'basic' },
  { name: 'vertical', description: 'Vertical slide transition', difficulty: 'Easy', category: 'basic' },
  { name: 'vertical-fade', description: 'Vertical slide + fade', difficulty: 'Easy', category: 'basic' },
  { name: 'parallax', description: 'Multi-layer parallax depth effect', difficulty: 'Medium', category: 'basic' },
  { name: 'overlap', description: 'Items overlap with stacked look', difficulty: 'Medium', category: 'basic' },
  { name: 'peek', description: 'Adjacent items peek from sides', difficulty: 'Medium', category: 'basic' },
  { name: 'stack', description: 'Cards stack, swipe reveals next', difficulty: 'Medium', category: 'advanced' },
  { name: 'tinder', description: 'Tinder-style swipe with rotation', difficulty: 'Hard', category: 'advanced' },
  { name: 'coverflow', description: 'Apple CoverFlow 3D perspective', difficulty: 'Hard', category: 'advanced' },
  { name: 'cube', description: '3D cube rotation', difficulty: 'Hard', category: 'advanced' },
  { name: 'flip', description: '3D card flip transition', difficulty: 'Hard', category: 'advanced' },
  { name: 'wheel', description: 'Ferris wheel circular motion', difficulty: 'Hard', category: 'advanced' },
  { name: 'accordion', description: 'Paper fold/unfold effect', difficulty: 'Hard', category: 'advanced' },
  { name: 'zoom', description: 'Zoom in/out with border radius', difficulty: 'Medium', category: 'advanced' },
  { name: 'rotate', description: 'Z-axis rotation transition', difficulty: 'Medium', category: 'advanced' },
  { name: 'depth', description: 'Depth-of-field receding effect', difficulty: 'Medium', category: 'advanced' },
  { name: 'newspaper', description: 'Fly in with spin like headlines', difficulty: 'Hard', category: 'creative' },
  { name: 'origami', description: 'Paper-fold origami effect', difficulty: 'Hard', category: 'creative' },
  { name: 'carousel-3d', description: 'True 3D circular carousel', difficulty: 'Hard', category: 'creative' },
  { name: 'wave', description: 'Sine wave motion', difficulty: 'Medium', category: 'creative' },
  { name: 'spiral', description: 'Spiral outward with rotation', difficulty: 'Hard', category: 'creative' },
  { name: 'glitch', description: 'Digital glitch jitter effect', difficulty: 'Medium', category: 'creative' },
  { name: 'morph', description: 'Shape morphing transition', difficulty: 'Medium', category: 'creative' },
  { name: 'shutter', description: 'Camera shutter open/close', difficulty: 'Medium', category: 'creative' },
  { name: 'domino', description: 'Domino falling effect', difficulty: 'Medium', category: 'creative' },
  { name: 'elastic', description: 'Elastic bounce stretch', difficulty: 'Medium', category: 'creative' },
  { name: 'blur-slide', description: 'Slide with simulated blur', difficulty: 'Easy', category: 'creative' },
  { name: 'windmill', description: 'Windmill pivot rotation', difficulty: 'Hard', category: 'creative' },
  { name: 'film-strip', description: 'Film strip slide with jitter', difficulty: 'Medium', category: 'creative' },
  { name: 'helix', description: 'DNA helix 3D spiral', difficulty: 'Hard', category: 'creative' },
  { name: 'gravity', description: 'Gravity drop with bounce', difficulty: 'Medium', category: 'creative' },
];

interface ListOptions {
  category?: string;
}

export const listCommand = (options: ListOptions): void => {
  let filtered = PRESETS;

  if (options.category) {
    filtered = PRESETS.filter((p) => p.category === options.category);
  }

  console.log(chalk.bold(`\n  react-native-ultra-carousel — ${filtered.length} presets\n`));

  const maxName = Math.max(...filtered.map((p) => p.name.length));

  for (const preset of filtered) {
    const diffColor =
      preset.difficulty === 'Easy'
        ? chalk.green
        : preset.difficulty === 'Medium'
          ? chalk.yellow
          : chalk.red;

    console.log(
      `  ${chalk.cyan(preset.name.padEnd(maxName + 2))}${preset.description.padEnd(40)}${diffColor(preset.difficulty)}`
    );
  }

  console.log(
    chalk.dim(`\n  Usage: npx ultra-carousel add <preset-name>\n`)
  );
};
