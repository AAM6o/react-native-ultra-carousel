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
import { stackAnimation } from './advanced/stack';
import { tinderAnimation } from './advanced/tinder';
import { coverflowAnimation } from './advanced/coverflow';
import { cubeAnimation } from './advanced/cube';
import { flipAnimation } from './advanced/flip';
import { wheelAnimation } from './advanced/wheel';
import { accordionAnimation } from './advanced/accordion';
import { zoomAnimation } from './advanced/zoom';
import { rotateAnimation } from './advanced/rotate';
import { depthAnimation } from './advanced/depth';
import { newspaperAnimation } from './creative/newspaper';
import { origamiAnimation } from './creative/origami';
import { carousel3dAnimation } from './creative/carousel3d';
import { waveAnimation } from './creative/wave';
import { spiralAnimation } from './creative/spiral';
import { glitchAnimation } from './creative/glitch';
import { morphAnimation } from './creative/morph';
import { shutterAnimation } from './creative/shutter';
import { dominoAnimation } from './creative/domino';
import { elasticAnimation } from './creative/elastic';
import { blurSlideAnimation } from './creative/blurSlide';
import { windmillAnimation } from './creative/windmill';
import { filmStripAnimation } from './creative/filmStrip';
import { helixAnimation } from './creative/helix';
import { gravityAnimation } from './creative/gravity';

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
    category: 'basic',
    animation: slideAnimation,
    defaults: { distance: 1 },
  });

  registerPreset({
    name: 'fade',
    description: 'Crossfade transition between stacked items',
    difficulty: 'Easy',
    category: 'basic',
    animation: fadeAnimation,
    defaults: { minOpacity: 0 },
  });

  registerPreset({
    name: 'slide-fade',
    description: 'Horizontal slide combined with opacity fade',
    difficulty: 'Easy',
    category: 'basic',
    animation: slideFadeAnimation,
    defaults: { distance: 200, minOpacity: 0.3 },
  });

  registerPreset({
    name: 'scale',
    description: 'Active item full size, neighbors scale down',
    difficulty: 'Easy',
    category: 'basic',
    animation: scaleAnimation,
    defaults: { minScale: 0.8, spacing: 50 },
  });

  registerPreset({
    name: 'scale-fade',
    description: 'Scale reduction combined with opacity fade',
    difficulty: 'Easy',
    category: 'basic',
    animation: scaleFadeAnimation,
    defaults: { minScale: 0.85, minOpacity: 0.5, spacing: 40 },
  });

  registerPreset({
    name: 'vertical',
    description: 'Vertical slide transition',
    difficulty: 'Easy',
    category: 'basic',
    animation: verticalAnimation,
    defaults: { distance: 250 },
  });

  registerPreset({
    name: 'vertical-fade',
    description: 'Vertical slide combined with opacity fade',
    difficulty: 'Easy',
    category: 'basic',
    animation: verticalFadeAnimation,
    defaults: { distance: 200, minOpacity: 0.3 },
  });

  registerPreset({
    name: 'parallax',
    description: 'Multi-layer parallax depth effect',
    difficulty: 'Medium',
    category: 'basic',
    animation: parallaxAnimation,
    defaults: { parallaxFactor: 0.3, distance: 300, minOpacity: 0.8 },
  });

  registerPreset({
    name: 'overlap',
    description: 'Items overlap each other with stacked appearance',
    difficulty: 'Medium',
    category: 'basic',
    animation: overlapAnimation,
    defaults: { overlapRatio: 0.7, minScale: 0.95, itemWidth: 300 },
  });

  registerPreset({
    name: 'peek',
    description: 'Active item centered with adjacent items peeking from sides',
    difficulty: 'Medium',
    category: 'basic',
    animation: peekAnimation,
    defaults: { peekAmount: 0.2, peekScale: 0.85, peekOpacity: 0.7, itemWidth: 300 },
  });
};

const registerAdvancedPresets = (): void => {
  registerPreset({
    name: 'stack',
    description: 'Cards stack on top, swipe reveals next card',
    difficulty: 'Medium',
    category: 'advanced',
    animation: stackAnimation,
    defaults: { scaleStep: 0.05, offsetY: 10, maxStack: 5, swipeDistance: 400 },
  });

  registerPreset({
    name: 'tinder',
    description: 'Tinder-style swipe cards with rotation',
    difficulty: 'Hard',
    category: 'advanced',
    animation: tinderAnimation,
    defaults: { maxRotation: 15, stackDepth: 3, scaleStep: 0.06, offsetY: 12, throwDistance: 500 },
  });

  registerPreset({
    name: 'coverflow',
    description: 'Apple CoverFlow 3D perspective effect',
    difficulty: 'Hard',
    category: 'advanced',
    animation: coverflowAnimation,
    defaults: { rotateY: 45, scale: 0.85, opacity: 0.6, perspective: 1000, offsetX: 50 },
  });

  registerPreset({
    name: 'cube',
    description: '3D cube rotation between items',
    difficulty: 'Hard',
    category: 'advanced',
    animation: cubeAnimation,
    defaults: { perspective: 800, itemWidth: 300 },
  });

  registerPreset({
    name: 'flip',
    description: '3D card flip transition',
    difficulty: 'Hard',
    category: 'advanced',
    animation: flipAnimation,
    defaults: { perspective: 1200, midScale: 0.9 },
  });

  registerPreset({
    name: 'wheel',
    description: 'Ferris wheel circular motion',
    difficulty: 'Hard',
    category: 'advanced',
    animation: wheelAnimation,
    defaults: { radius: 200, anglePerItem: 30, minScale: 0.7, minOpacity: 0.5 },
  });

  registerPreset({
    name: 'accordion',
    description: 'Fold/unfold accordion effect',
    difficulty: 'Hard',
    category: 'advanced',
    animation: accordionAnimation,
    defaults: { foldAngle: 90, perspective: 800, minOpacity: 0.3 },
  });

  registerPreset({
    name: 'zoom',
    description: 'Zoom in/out transition with border radius',
    difficulty: 'Medium',
    category: 'advanced',
    animation: zoomAnimation,
    defaults: { minScale: 0.5, minOpacity: 0.4, borderRadius: 16 },
  });

  registerPreset({
    name: 'rotate',
    description: 'Z-axis rotation with scale and offset',
    difficulty: 'Medium',
    category: 'advanced',
    animation: rotateAnimation,
    defaults: { maxRotation: 30, minScale: 0.8, minOpacity: 0.6, offsetX: 100 },
  });

  registerPreset({
    name: 'depth',
    description: 'Depth-of-field effect with items receding',
    difficulty: 'Medium',
    category: 'advanced',
    animation: depthAnimation,
    defaults: { perspective: 1000, minScale: 0.7, minOpacity: 0.4, offsetX: 80, depthOffset: 200 },
  });
};

const registerCreativePresets = (): void => {
  registerPreset({
    name: 'newspaper',
    description: 'Items fly in with rotation like newspaper headlines',
    difficulty: 'Hard',
    category: 'creative',
    animation: newspaperAnimation,
    defaults: { rotations: 2, entryOffset: 500, springDamping: 15 },
  });

  registerPreset({
    name: 'origami',
    description: 'Paper-fold origami effect',
    difficulty: 'Hard',
    category: 'creative',
    animation: origamiAnimation,
    defaults: { foldAngle: 60, perspective: 800 },
  });

  registerPreset({
    name: 'carousel-3d',
    description: 'True 3D circular carousel',
    difficulty: 'Hard',
    category: 'creative',
    animation: carousel3dAnimation,
    defaults: { radius: 300, perspective: 1200, tilt: 10 },
  });

  registerPreset({
    name: 'wave',
    description: 'Sine wave motion with phase offsets',
    difficulty: 'Medium',
    category: 'creative',
    animation: waveAnimation,
    defaults: { amplitude: 50, frequency: 2 },
  });

  registerPreset({
    name: 'spiral',
    description: 'Items spiral outward with rotation',
    difficulty: 'Hard',
    category: 'creative',
    animation: spiralAnimation,
    defaults: { radius: 150, rotationSpeed: 180, minScale: 0.6 },
  });

  registerPreset({
    name: 'glitch',
    description: 'Digital glitch jitter and flicker effect',
    difficulty: 'Medium',
    category: 'creative',
    animation: glitchAnimation,
    defaults: { intensity: 10, flickerAmount: 0.3 },
  });

  registerPreset({
    name: 'morph',
    description: 'Shape morphing with scale and border radius',
    difficulty: 'Medium',
    category: 'creative',
    animation: morphAnimation,
    defaults: { minScale: 0.6, maxRadius: 100, minOpacity: 0.3 },
  });

  registerPreset({
    name: 'shutter',
    description: 'Camera shutter open/close effect',
    difficulty: 'Medium',
    category: 'creative',
    animation: shutterAnimation,
    defaults: { minScaleX: 0.01, rotateAngle: 5 },
  });

  registerPreset({
    name: 'domino',
    description: 'Domino falling rotation and drop effect',
    difficulty: 'Medium',
    category: 'creative',
    animation: dominoAnimation,
    defaults: { maxRotation: 45, dropDistance: 150, minOpacity: 0.2 },
  });

  registerPreset({
    name: 'elastic',
    description: 'Elastic bounce stretch effect',
    difficulty: 'Medium',
    category: 'creative',
    animation: elasticAnimation,
    defaults: { elasticity: 1.3, damping: 0.7, distance: 200 },
  });

  registerPreset({
    name: 'blur-slide',
    description: 'Slide with simulated blur depth-of-field',
    difficulty: 'Easy',
    category: 'creative',
    animation: blurSlideAnimation,
    defaults: { distance: 300, minOpacity: 0.2, minScale: 0.9 },
  });

  registerPreset({
    name: 'windmill',
    description: 'Windmill rotation around a pivot',
    difficulty: 'Hard',
    category: 'creative',
    animation: windmillAnimation,
    defaults: { rotationAngle: 90, radius: 100, minScale: 0.75 },
  });

  registerPreset({
    name: 'film-strip',
    description: 'Film strip slide with vertical jitter and skew',
    difficulty: 'Medium',
    category: 'creative',
    animation: filmStripAnimation,
    defaults: { distance: 300, verticalOffset: 20, skewAngle: 5 },
  });

  registerPreset({
    name: 'helix',
    description: 'DNA helix 3D spiral path',
    difficulty: 'Hard',
    category: 'creative',
    animation: helixAnimation,
    defaults: { radius: 100, perspective: 800, minScale: 0.6 },
  });

  registerPreset({
    name: 'gravity',
    description: 'Gravity drop with acceleration and rotation',
    difficulty: 'Medium',
    category: 'creative',
    animation: gravityAnimation,
    defaults: { gravity: 300, maxRotation: 10, minOpacity: 0.2 },
  });
};

registerBuiltInPresets();
registerAdvancedPresets();
registerCreativePresets();
