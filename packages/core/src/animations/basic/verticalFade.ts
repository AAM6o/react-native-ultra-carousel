/**
 * @file Vertical-fade animation preset
 * @description Combines vertical slide with opacity fade
 * @preset vertical-fade
 * @difficulty Easy
 * @category basic
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the vertical-fade animation */
export interface VerticalFadeConfig {
  /** Vertical distance in pixels (default: 200) */
  distance: number;
  /** Minimum opacity for inactive items (default: 0.3) */
  minOpacity: number;
}

/** Default vertical-fade configuration */
export const VERTICAL_FADE_DEFAULTS: VerticalFadeConfig = {
  distance: 200,
  minOpacity: 0.3,
};

/**
 * Vertical-fade animation worklet.
 * Combines vertical translation with opacity reduction.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const verticalFadeAnimation = (
  progress: number,
  config?: Partial<VerticalFadeConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...VERTICAL_FADE_DEFAULTS, ...config };

  const translateY = interpolate(
    progress,
    [-1, 0, 1],
    [-c.distance, 0, c.distance],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minOpacity],
    Extrapolation.CLAMP
  );

  return {
    transform: [{ translateY }],
    opacity,
  };
};
