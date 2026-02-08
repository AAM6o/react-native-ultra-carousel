/**
 * @file Rotate animation preset
 * @description Rotation-based transition with Z-axis spin and scale
 * @preset rotate
 * @difficulty Medium
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the rotate animation */
export interface RotateConfig {
  /** Maximum rotation angle in degrees (default: 30) */
  maxRotation: number;
  /** Scale of rotated items (default: 0.8) */
  minScale: number;
  /** Opacity of rotated items (default: 0.6) */
  minOpacity: number;
  /** Horizontal offset (default: 100) */
  offsetX: number;
}

/** Default rotate configuration */
export const ROTATE_DEFAULTS: RotateConfig = {
  maxRotation: 30,
  minScale: 0.8,
  minOpacity: 0.6,
  offsetX: 100,
};

/**
 * Rotate animation worklet.
 * Items rotate around the Z axis as they transition, combined with
 * translation, scaling, and opacity changes.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const rotateAnimation = (
  progress: number,
  config?: Partial<RotateConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...ROTATE_DEFAULTS, ...config };

  const rotate = interpolate(
    progress,
    [-1, 0, 1],
    [c.maxRotation, 0, -c.maxRotation],
    Extrapolation.CLAMP
  );

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-c.offsetX, 0, c.offsetX],
    Extrapolation.CLAMP
  );

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

  return {
    transform: [
      { translateX },
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity,
  };
};
