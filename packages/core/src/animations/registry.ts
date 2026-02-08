/**
 * @file Animation preset registry
 * @description Central registry for all animation presets — lookup by name
 */

import type { AnimationPresetFn, AnimationPresetMeta } from './types';
import { slideAnimation } from './basic/slide';
import { fadeAnimation } from './basic/fade';
import { slideFadeAnimation } from './basic/slideFade';
import { scaleAnimation } from './basic/scale';
import { scaleFadeAnimation } from './basic/scaleFade';
import { verticalAnimation } from './basic/vertical';
import { verticalFadeAnimation } from './basic/verticalFade';
import { parallaxAnimation } from './basic/parallax';
import { overlapAnimation } from './basic/overlap';
import { peekAnimation } from './basic/peek';

/** Internal registry map of preset names to animation functions */
const registry = new Map<string, AnimationPresetFn>();

/** Internal metadata registry */
const metaRegistry = new Map<string, AnimationPresetMeta>();

/**
 * Registers a preset in the animation registry.
 *
 * @param meta - Full metadata for the preset including the animation function
 */
export const registerPreset = (meta: AnimationPresetMeta): void => {
  registry.set(meta.name, meta.animation);
  metaRegistry.set(meta.name, meta);
};

/**
 * Retrieves an animation function by preset name.
 *
 * @param name - The preset name to look up
 * @returns The animation function, or undefined if not found
 */
export const getPreset = (name: string): AnimationPresetFn | undefined => {
  return registry.get(name);
};

/**
 * Retrieves metadata for a preset by name.
 *
 * @param name - The preset name to look up
 * @returns The preset metadata, or undefined if not found
 */
export const getPresetMeta = (name: string): AnimationPresetMeta | undefined => {
  return metaRegistry.get(name);
};

/**
 * Returns all registered preset names.
 *
 * @returns Array of registered preset names
 */
export const getAllPresetNames = (): string[] => {
  return Array.from(registry.keys());
};

/**
 * Returns all registered preset metadata.
 *
 * @returns Array of all preset metadata
 */
export const getAllPresetMeta = (): AnimationPresetMeta[] => {
  return Array.from(metaRegistry.values());
};

/**
 * Checks whether a preset name is registered.
 *
 * @param name - The preset name to check
 * @returns True if the preset is registered
 */
export const isPresetRegistered = (name: string): boolean => {
  return registry.has(name);
};

/** Register all built-in basic presets */
const registerBuiltInPresets = (): void => {
  registerPreset({
    name: 'slide',
    description: 'Standard horizontal slide transition',
    difficulty: 'Easy',
    phase: 1,
    animation: slideAnimation,
    defaults: { distance: 1 },
  });

  registerPreset({
    name: 'fade',
    description: 'Crossfade transition between stacked items',
    difficulty: 'Easy',
    phase: 1,
    animation: fadeAnimation,
    defaults: { minOpacity: 0 },
  });

  registerPreset({
    name: 'slide-fade',
    description: 'Horizontal slide combined with opacity fade',
    difficulty: 'Easy',
    phase: 1,
    animation: slideFadeAnimation,
    defaults: { distance: 200, minOpacity: 0.3 },
  });

  registerPreset({
    name: 'scale',
    description: 'Active item full size, neighbors scale down',
    difficulty: 'Easy',
    phase: 1,
    animation: scaleAnimation,
    defaults: { minScale: 0.8, spacing: 50 },
  });

  registerPreset({
    name: 'scale-fade',
    description: 'Scale reduction combined with opacity fade',
    difficulty: 'Easy',
    phase: 1,
    animation: scaleFadeAnimation,
    defaults: { minScale: 0.85, minOpacity: 0.5, spacing: 40 },
  });

  registerPreset({
    name: 'vertical',
    description: 'Vertical slide transition',
    difficulty: 'Easy',
    phase: 1,
    animation: verticalAnimation,
    defaults: { distance: 250 },
  });

  registerPreset({
    name: 'vertical-fade',
    description: 'Vertical slide combined with opacity fade',
    difficulty: 'Easy',
    phase: 1,
    animation: verticalFadeAnimation,
    defaults: { distance: 200, minOpacity: 0.3 },
  });

  registerPreset({
    name: 'parallax',
    description: 'Multi-layer parallax depth effect',
    difficulty: 'Medium',
    phase: 1,
    animation: parallaxAnimation,
    defaults: { parallaxFactor: 0.3, distance: 300, minOpacity: 0.8 },
  });

  registerPreset({
    name: 'overlap',
    description: 'Items overlap each other with stacked appearance',
    difficulty: 'Medium',
    phase: 1,
    animation: overlapAnimation,
    defaults: { overlapRatio: 0.7, minScale: 0.95, itemWidth: 300 },
  });

  registerPreset({
    name: 'peek',
    description: 'Active item centered with adjacent items peeking from sides',
    difficulty: 'Medium',
    phase: 1,
    animation: peekAnimation,
    defaults: { peekAmount: 0.2, peekScale: 0.85, peekOpacity: 0.7, itemWidth: 300 },
  });
};

registerBuiltInPresets();
