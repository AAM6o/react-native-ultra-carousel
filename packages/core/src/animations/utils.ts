/**
 * @file Shared animation utility functions
 * @description Common helpers used across animation presets
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';

/**
 * Symmetric interpolation helper for common animation patterns.
 * Maps progress [-1, 0, 1] to [edge, center, edge] values.
 *
 * @param progress - Normalized progress value
 * @param center - Value at progress = 0 (active)
 * @param edge - Value at progress = -1 or 1
 * @returns Interpolated value
 */
export const symmetricInterpolate = (
  progress: number,
  center: number,
  edge: number
): number => {
  'worklet';
  return interpolate(
    progress,
    [-1, 0, 1],
    [edge, center, edge],
    Extrapolation.CLAMP
  );
};

/**
 * Directional interpolation for left-center-right patterns.
 *
 * @param progress - Normalized progress value
 * @param left - Value at progress = -1
 * @param center - Value at progress = 0
 * @param right - Value at progress = 1
 * @returns Interpolated value
 */
export const directionalInterpolate = (
  progress: number,
  left: number,
  center: number,
  right: number
): number => {
  'worklet';
  return interpolate(
    progress,
    [-1, 0, 1],
    [left, center, right],
    Extrapolation.CLAMP
  );
};

/**
 * Computes zIndex based on distance from active item.
 * Active item gets highest zIndex.
 *
 * @param progress - Normalized progress value
 * @param maxZIndex - Maximum zIndex for active item
 * @returns Rounded zIndex value
 */
export const computeZIndex = (
  progress: number,
  maxZIndex: number = 100
): number => {
  'worklet';
  const z = interpolate(
    Math.abs(progress),
    [0, 1],
    [maxZIndex, 0],
    Extrapolation.CLAMP
  );
  return Math.round(z);
};
