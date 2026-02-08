/**
 * @file BlurSlide animation preset
 * @description Slide with blur simulation — items slide with opacity and scale to simulate blur
 * @preset blurSlide
 * @difficulty Medium
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the blur slide animation */
export interface BlurSlideConfig {
  /** Horizontal travel distance in pixels (default: 300) */
  distance: number;
  /** Minimum opacity for off-screen items to simulate blur (default: 0.2) */
  minOpacity: number;
  /** Minimum scale for depth-of-field effect (default: 0.9) */
  minScale: number;
}

/** Default blur slide configuration */
export const BLUR_SLIDE_DEFAULTS: BlurSlideConfig = {
  distance: 300,
  minOpacity: 0.2,
  minScale: 0.9,
};

/**
 * BlurSlide animation worklet.
 * Combines a horizontal slide with progressive opacity reduction and
 * subtle scale down to simulate a depth-of-field blur effect without
 * requiring native blur filters.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const blurSlideAnimation = (
  progress: number,
  config?: Partial<BlurSlideConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...BLUR_SLIDE_DEFAULTS, ...config };

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-c.distance, 0, c.distance],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.3, 1],
    [1, 0.7, c.minOpacity],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  // Slight vertical shift to reinforce the depth perception
  const translateY = interpolate(
    Math.abs(progress),
    [0, 1],
    [0, 10],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateX },
      { translateY },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
