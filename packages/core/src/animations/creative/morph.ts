/**
 * @file Morph animation preset
 * @description Morph transition — items scale and change border radius from circle to rectangle
 * @preset morph
 * @difficulty Medium
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the morph animation */
export interface MorphConfig {
  /** Minimum scale at full transition (default: 0.6) */
  minScale: number;
  /** Maximum border radius — fully circular state (default: 100) */
  maxRadius: number;
  /** Minimum opacity at full transition (default: 0.3) */
  minOpacity: number;
}

/** Default morph configuration */
export const MORPH_DEFAULTS: MorphConfig = {
  minScale: 0.6,
  maxRadius: 100,
  minOpacity: 0.3,
};

/**
 * Morph animation worklet.
 * Creates a shape-shifting transition: the active item is a sharp rectangle
 * at full scale and full opacity. As it transitions out, it shrinks, rounds
 * into a circle (via increasing borderRadius), and fades. Incoming items
 * reverse the process — expanding from a circle to a rectangle.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const morphAnimation = (
  progress: number,
  config?: Partial<MorphConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...MORPH_DEFAULTS, ...config };

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const borderRadius = interpolate(
    Math.abs(progress),
    [0, 1],
    [0, c.maxRadius],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, (1 + c.minOpacity) / 2, c.minOpacity],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { scale },
    ],
    opacity,
    borderRadius,
    zIndex,
    overflow: 'hidden',
  };
};
