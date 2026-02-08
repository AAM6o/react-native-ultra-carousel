/**
 * @file Slide-fade animation preset
 * @description Combines horizontal slide with opacity fade for an elegant transition
 * @preset slide-fade
 * @difficulty Easy
 * @phase 1
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the slide-fade animation */
export interface SlideFadeConfig {
  /** Slide distance in pixels (default: 200) */
  distance: number;
  /** Minimum opacity for inactive items (default: 0.3) */
  minOpacity: number;
}

/** Default slide-fade configuration */
export const SLIDE_FADE_DEFAULTS: SlideFadeConfig = {
  distance: 200,
  minOpacity: 0.3,
};

/**
 * Slide-fade animation worklet.
 * Combines translateX movement with opacity reduction for smooth transitions.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const slideFadeAnimation = (
  progress: number,
  config?: Partial<SlideFadeConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...SLIDE_FADE_DEFAULTS, ...config };

  const translateX = interpolate(
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
    transform: [{ translateX }],
    opacity,
  };
};
