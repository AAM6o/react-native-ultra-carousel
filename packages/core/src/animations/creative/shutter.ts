/**
 * @file Shutter animation preset
 * @description Camera shutter effect — items squeeze horizontally then expand, like a shutter closing and opening
 * @preset shutter
 * @difficulty Medium
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the shutter animation */
export interface ShutterConfig {
  /** Minimum horizontal scale at the fully closed point (default: 0.01) */
  minScaleX: number;
  /** Slight rotation angle in degrees at mid-transition (default: 5) */
  rotateAngle: number;
}

/** Default shutter configuration */
export const SHUTTER_DEFAULTS: ShutterConfig = {
  minScaleX: 0.01,
  rotateAngle: 5,
};

/**
 * Shutter animation worklet.
 * Simulates a camera shutter: as the item transitions away, scaleX closes
 * toward zero (the shutter shuts), and as the next item transitions in,
 * scaleX expands from zero to one (the shutter opens). A slight rotation
 * and opacity fade add cinematic polish.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const shutterAnimation = (
  progress: number,
  config?: Partial<ShutterConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...SHUTTER_DEFAULTS, ...config };

  // scaleX: fully open at 0, closes to minScaleX at mid-transition, opens again
  const scaleX = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, c.minScaleX, c.minScaleX],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.4, 1],
    [1, 0.6, 0],
    Extrapolation.CLAMP
  );

  // Slight rotation adds a mechanical feel
  const rotate = interpolate(
    progress,
    [-1, 0, 1],
    [-c.rotateAngle, 0, c.rotateAngle],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { scaleX },
      { rotate: `${rotate}deg` },
    ],
    opacity,
    zIndex,
  };
};
