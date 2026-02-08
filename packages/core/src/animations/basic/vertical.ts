/**
 * @file Vertical animation preset
 * @description Vertical slide transition for vertical carousels
 * @preset vertical
 * @difficulty Easy
 * @category basic
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the vertical animation */
export interface VerticalConfig {
  /** Vertical distance multiplier (default: 250) */
  distance: number;
}

/** Default vertical configuration */
export const VERTICAL_DEFAULTS: VerticalConfig = {
  distance: 250,
};

/**
 * Vertical animation worklet.
 * Translates items vertically instead of horizontally.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const verticalAnimation = (
  progress: number,
  config?: Partial<VerticalConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...VERTICAL_DEFAULTS, ...config };

  const translateY = interpolate(
    progress,
    [-1, 0, 1],
    [-c.distance, 0, c.distance],
    Extrapolation.CLAMP
  );

  return {
    transform: [{ translateY }],
    opacity: 1,
  };
};
