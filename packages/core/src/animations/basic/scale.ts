/**
 * @file Scale animation preset
 * @description Active item at full scale, neighbors shrink — creates depth emphasis
 * @preset scale
 * @difficulty Easy
 * @category basic
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the scale animation */
export interface ScaleConfig {
  /** Scale of inactive items (default: 0.8) */
  minScale: number;
  /** Horizontal spacing between items (default: 50) */
  spacing: number;
}

/** Default scale configuration */
export const SCALE_DEFAULTS: ScaleConfig = {
  minScale: 0.8,
  spacing: 50,
};

/**
 * Scale animation worklet.
 * Active item is full size, adjacent items scale down to create a size hierarchy.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const scaleAnimation = (
  progress: number,
  config?: Partial<ScaleConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...SCALE_DEFAULTS, ...config };

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-c.spacing, 0, c.spacing],
    Extrapolation.CLAMP
  );

  return {
    transform: [
      { translateX },
      { scale },
    ],
    opacity: 1,
  };
};
