/**
 * @file Gravity animation preset
 * @description Gravity effect — items fall with acceleration and bounce
 * @preset gravity
 * @difficulty Medium
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the gravity animation */
export interface GravityConfig {
  /** Maximum fall distance simulating gravitational pull (default: 300) */
  gravity: number;
  /** Maximum rotation angle in degrees during the fall (default: 10) */
  maxRotation: number;
  /** Minimum opacity for fully fallen items (default: 0.2) */
  minOpacity: number;
}

/** Default gravity configuration */
export const GRAVITY_DEFAULTS: GravityConfig = {
  gravity: 300,
  maxRotation: 10,
  minOpacity: 0.2,
};

/**
 * Gravity animation worklet.
 * Simulates gravitational acceleration — items drop with a quadratic
 * (eased) translateY curve, slight tumbling rotation, and fading
 * opacity as they fall away from the active position.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const gravityAnimation = (
  progress: number,
  config?: Partial<GravityConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...GRAVITY_DEFAULTS, ...config };

  const absProgress = Math.abs(progress);

  // Quadratic curve to simulate gravitational acceleration (distance = 0.5 * g * t^2)
  const translateY = interpolate(
    absProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, c.gravity * 0.0625, c.gravity * 0.25, c.gravity * 0.5625, c.gravity],
    Extrapolation.CLAMP
  );

  // Slight tumbling rotation during the fall
  const rotate = interpolate(
    progress,
    [-1, 0, 1],
    [-c.maxRotation, 0, c.maxRotation],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    absProgress,
    [0, 0.4, 1],
    [1, 0.7, c.minOpacity],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    absProgress,
    [0, 1],
    [1, 0.9],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(absProgress, [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateY },
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
