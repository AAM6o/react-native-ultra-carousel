/**
 * @file CLI entry point
 * @description Main CLI for react-native-ultra-carousel
 */

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';
import { listCommand } from './commands/list';

const program = new Command();

program
  .name('ultra-carousel')
  .description('CLI tool for react-native-ultra-carousel')
  .version('0.1.0');

program
  .command('init')
  .description('Scaffold a basic carousel setup in your project')
  .option('-t, --template <name>', 'template to use', 'basic-carousel')
  .action(initCommand);

program
  .command('add <preset>')
  .description('Add a specific animation preset with example code')
  .option('-d, --dir <path>', 'output directory', './src/components')
  .action(addCommand);

program
  .command('list')
  .description('List all available animation presets')
  .option('-c, --category <name>', 'filter by category (basic, advanced, creative)')
  .action(listCommand);

program.parse();
