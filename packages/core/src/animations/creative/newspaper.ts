/**
 * @file Newspaper animation preset
 * @description Newspaper effect — items fly in with rotation like spinning newspaper headlines
 * @preset newspaper
 * @difficulty Hard
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the newspaper animation */
export interface NewspaperConfig {
  /** Number of full rotations during entry (default: 2) */
  rotations: number;
  /** Vertical offset items fly in from in pixels (default: 500) */
  entryOffset: number;
  /** Spring damping factor — affects overshoot feel (default: 15) */
  springDamping: number;
}

/** Default newspaper configuration */
export const NEWSPAPER_DEFAULTS: NewspaperConfig = {
  rotations: 2,
  entryOffset: 500,
  springDamping: 15,
};

/**
 * Newspaper animation worklet.
 * Items spin in from off-screen like a newspaper headline flying toward the
 * camera. At progress 0 the item is fully visible and stationary. At -1/+1
 * the item is scaled to zero, rotated by N full turns, translated far
 * above, and fully transparent.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const newspaperAnimation = (
  progress: number,
  config?: Partial<NewspaperConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...NEWSPAPER_DEFAULTS, ...config };
  const totalRotation = c.rotations * 360;

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, 0],
    Extrapolation.CLAMP
  );

  const rotate = interpolate(
    progress,
    [-1, 0, 1],
    [totalRotation, 0, -totalRotation],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    Math.abs(progress),
    [0, 1],
    [0, -c.entryOffset],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, 0.6, 0],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
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
