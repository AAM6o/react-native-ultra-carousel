/**
 * @file Flip animation preset
 * @description 3D card flip transition with front/back sides
 * @preset flip
 * @difficulty Hard
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the flip animation */
export interface FlipConfig {
  /** 3D perspective distance (default: 1200) */
  perspective: number;
  /** Scale at the midpoint of the flip (default: 0.9) */
  midScale: number;
}

/** Default flip configuration */
export const FLIP_DEFAULTS: FlipConfig = {
  perspective: 1200,
  midScale: 0.9,
};

/**
 * Flip animation worklet.
 * Creates a 3D card flip effect. At progress 0 the card faces forward.
 * At progress -1/+1 it has rotated 180deg, showing the next card.
 * Opacity drops at 90deg to hide the "edge" of the card.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const flipAnimation = (
  progress: number,
  config?: Partial<FlipConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...FLIP_DEFAULTS, ...config };

  const rotateY = interpolate(
    progress,
    [-1, 0, 1],
    [180, 0, -180],
    Extrapolation.CLAMP
  );

  const absRotation = Math.abs(rotateY);
  const opacity = absRotation > 90 ? 0 : 1;

  const scale = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, c.midScale, 1],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { perspective: c.perspective },
      { rotateY: `${rotateY}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
