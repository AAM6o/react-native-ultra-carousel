/**
 * @file Parallax animation preset
 * @description Multi-layer parallax effect with foreground and background moving at different speeds
 * @preset parallax
 * @difficulty Medium
 * @phase 1
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the parallax animation */
export interface ParallaxConfig {
  /** Speed ratio for parallax layers (default: 0.3) — lower = more parallax */
  parallaxFactor: number;
  /** Slide distance in pixels (default: 300) */
  distance: number;
  /** Minimum opacity for inactive items (default: 0.8) */
  minOpacity: number;
}

/** Default parallax configuration */
export const PARALLAX_DEFAULTS: ParallaxConfig = {
  parallaxFactor: 0.3,
  distance: 300,
  minOpacity: 0.8,
};

/**
 * Parallax animation worklet.
 * Background content moves slower than the container for a depth effect.
 * The foreground (item container) translates at full speed while the inner
 * content translates at a reduced rate (parallaxFactor).
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const parallaxAnimation = (
  progress: number,
  config?: Partial<ParallaxConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...PARALLAX_DEFAULTS, ...config };

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-c.distance * c.parallaxFactor, 0, c.distance * c.parallaxFactor],
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
