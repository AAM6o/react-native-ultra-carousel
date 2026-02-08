/**
 * @file Math utility functions
 * @description Shared mathematical helpers for animations and layout
 */

/**
 * Clamps a value between a minimum and maximum.
 *
 * @param value - The value to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns Clamped value
 */
export const clamp = (value: number, min: number, max: number): number => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

/**
 * Linearly interpolates between two values.
 *
 * @param from - Start value
 * @param to - End value
 * @param progress - Interpolation factor (0 to 1)
 * @returns Interpolated value
 */
export const lerp = (from: number, to: number, progress: number): number => {
  'worklet';
  return from + (to - from) * progress;
};

/**
 * Normalizes a value from one range to another.
 *
 * @param value - Input value
 * @param inputMin - Input range minimum
 * @param inputMax - Input range maximum
 * @param outputMin - Output range minimum
 * @param outputMax - Output range maximum
 * @returns Normalized value
 */
export const normalize = (
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number = 0,
  outputMax: number = 1
): number => {
  'worklet';
  const inputRange = inputMax - inputMin;
  if (inputRange === 0) return outputMin;
  const normalized = (value - inputMin) / inputRange;
  return outputMin + normalized * (outputMax - outputMin);
};

/**
 * Converts degrees to radians.
 *
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
export const toRadians = (degrees: number): number => {
  'worklet';
  return (degrees * Math.PI) / 180;
};

/**
 * Wraps an index within bounds (for loop mode).
 *
 * @param index - The index to wrap
 * @param total - Total number of items
 * @returns Wrapped index
 */
export const wrapIndex = (index: number, total: number): number => {
  'worklet';
  if (total === 0) return 0;
  return ((index % total) + total) % total;
};
