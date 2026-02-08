/**
 * @file Scale-fade animation preset
 * @description Combines scale and opacity for an elegant depth + fade effect
 * @preset scale-fade
 * @difficulty Easy
 * @category basic
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the scale-fade animation */
export interface ScaleFadeConfig {
  /** Scale of inactive items (default: 0.85) */
  minScale: number;
  /** Minimum opacity for inactive items (default: 0.5) */
  minOpacity: number;
  /** Horizontal spacing (default: 40) */
  spacing: number;
}

/** Default scale-fade configuration */
export const SCALE_FADE_DEFAULTS: ScaleFadeConfig = {
  minScale: 0.85,
  minOpacity: 0.5,
  spacing: 40,
};

/**
 * Scale-fade animation worklet.
 * Combines scale reduction with opacity fade for a polished transition.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const scaleFadeAnimation = (
  progress: number,
  config?: Partial<ScaleFadeConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...SCALE_FADE_DEFAULTS, ...config };

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minOpacity],
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
    opacity,
  };
};
