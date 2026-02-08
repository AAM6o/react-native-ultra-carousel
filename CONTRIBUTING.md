# Contributing to react-native-ultra-carousel

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 18
- Yarn 1.x
- React Native development environment

### Getting Started

1. Fork and clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Build all packages:

```bash
yarn build
```

4. Run tests:

```bash
yarn test
```

## Project Structure

```
packages/
  core/       - Main library (react-native-ultra-carousel)
  cli/        - CLI tool (ultra-carousel-cli)
  playground/ - Expo playground app
  docs/       - Documentation site
examples/
  expo-example/  - Expo example app
  bare-example/  - React Native CLI example
```

## Development Workflow

### Creating a New Animation Preset

1. Create a new file in `packages/core/src/animations/{category}/` (basic, advanced, or creative)
2. Follow the preset template:

```typescript
/**
 * @file MyPreset animation preset
 * @description Description of the effect
 * @preset my-preset
 * @difficulty Easy|Medium|Hard
 * @category basic|advanced|creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

export interface MyPresetConfig {
  // config options with defaults documented
}

export const MY_PRESET_DEFAULTS: MyPresetConfig = {
  // sensible defaults
};

export const myPresetAnimation = (
  progress: number,
  config?: Partial<MyPresetConfig>
): AnimatedItemStyle => {
  'worklet';  // REQUIRED!

  const c = { ...MY_PRESET_DEFAULTS, ...config };
  // implementation...
};
```

3. Register it in `packages/core/src/animations/registry.ts`
4. Export it from `packages/core/src/animations/index.ts`
5. Add tests in `packages/core/__tests__/animations/`

### Rules

- All animations MUST have the `'worklet'` directive
- TypeScript strict mode - no `any` types
- All components MUST have `displayName`
- All public APIs MUST have TSDoc comments
- Test coverage minimum 80%

## Commit Convention

We use conventional commits:

```
feat: add new feature
fix: fix a bug
perf: performance improvement
docs: documentation changes
test: add or update tests
chore: maintenance tasks
refactor: code refactoring
style: formatting changes
ci: CI/CD changes
```

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass: `yarn test`
4. Ensure no lint errors: `yarn lint`
5. Ensure types are correct: `yarn typecheck`
6. Add a changeset: `yarn changeset`
7. Submit a PR

## Reporting Issues

- Use the issue templates
- Include reproduction steps
- Include your environment details (RN version, platform, etc.)

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
