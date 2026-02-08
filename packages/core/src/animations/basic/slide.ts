/**
 * @file Slide animation preset
 * @description Standard horizontal slide transition — the default carousel behavior
 * @preset slide
 * @difficulty Easy
 * @phase 1
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the slide animation */
export interface SlideConfig {
  /** Slide distance multiplier relative to item width (default: 1) */
  distance: number;
}

/** Default slide configuration */
export const SLIDE_DEFAULTS: SlideConfig = {
  distance: 1,
};

/** Default item width used for slide calculations */
const DEFAULT_ITEM_WIDTH = 300;

/**
 * Slide animation worklet.
 * Translates items horizontally based on scroll progress.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const slideAnimation = (
  progress: number,
  config?: Partial<SlideConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...SLIDE_DEFAULTS, ...config };

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-DEFAULT_ITEM_WIDTH * c.distance, 0, DEFAULT_ITEM_WIDTH * c.distance],
    Extrapolation.CLAMP
  );

  return {
    transform: [{ translateX }],
    opacity: 1,
  };
};
