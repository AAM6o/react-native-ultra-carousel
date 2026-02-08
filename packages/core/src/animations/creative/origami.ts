/**
 * @file Origami animation preset
 * @description Origami fold effect — items fold in and out like a sheet of paper
 * @preset origami
 * @difficulty Hard
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the origami animation */
export interface OrigamiConfig {
  /** Maximum fold angle in degrees (default: 60) */
  foldAngle: number;
  /** 3D perspective distance (default: 800) */
  perspective: number;
}

/** Default origami configuration */
export const ORIGAMI_DEFAULTS: OrigamiConfig = {
  foldAngle: 60,
  perspective: 800,
};

/**
 * Origami animation worklet.
 * Simulates paper folding: at progress 0 the item is flat and fully visible.
 * As progress moves toward -1 or +1 the item folds along its horizontal axis
 * using rotateX, collapses via scaleY, and fades out. Perspective gives the
 * fold a convincing 3D depth.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const origamiAnimation = (
  progress: number,
  config?: Partial<OrigamiConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...ORIGAMI_DEFAULTS, ...config };

  const rotateX = interpolate(
    progress,
    [-1, 0, 1],
    [c.foldAngle, 0, -c.foldAngle],
    Extrapolation.CLAMP
  );

  const scaleY = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, 0.3],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, 0.7, 0],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    Math.abs(progress),
    [0, 1],
    [0, 30],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { perspective: c.perspective },
      { rotateX: `${rotateX}deg` },
      { scaleY },
      { translateY },
    ],
    opacity,
    zIndex,
    overflow: 'hidden',
  };
};
