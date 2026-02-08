/**
 * @file Fade animation preset
 * @description Crossfade transition between items — items stack and opacity changes
 * @preset fade
 * @difficulty Easy
 * @category basic
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';
import { computeZIndex } from '../utils';

/** Configuration for the fade animation */
export interface FadeConfig {
  /** Minimum opacity for inactive items (default: 0) */
  minOpacity: number;
}

/** Default fade configuration */
export const FADE_DEFAULTS: FadeConfig = {
  minOpacity: 0,
};

/**
 * Fade animation worklet.
 * Items stack on top of each other, only opacity transitions.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const fadeAnimation = (
  progress: number,
  config?: Partial<FadeConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...FADE_DEFAULTS, ...config };

  const opacity = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minOpacity],
    Extrapolation.CLAMP
  );

  return {
    opacity,
    zIndex: computeZIndex(progress),
  };
};
