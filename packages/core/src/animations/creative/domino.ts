/**
 * @file Domino animation preset
 * @description Domino falling effect — items rotate and fall like dominos
 * @preset domino
 * @difficulty Hard
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the domino animation */
export interface DominoConfig {
  /** Maximum rotation angle in degrees when falling (default: 45) */
  maxRotation: number;
  /** Vertical drop distance in pixels (default: 150) */
  dropDistance: number;
  /** Minimum opacity for items that have fully fallen (default: 0.2) */
  minOpacity: number;
}

/** Default domino configuration */
export const DOMINO_DEFAULTS: DominoConfig = {
  maxRotation: 45,
  dropDistance: 150,
  minOpacity: 0.2,
};

/**
 * Domino animation worklet.
 * Items rotate around their base edge and drop downward, simulating
 * a chain of dominos toppling over one after another.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const dominoAnimation = (
  progress: number,
  config?: Partial<DominoConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...DOMINO_DEFAULTS, ...config };

  const rotateZ = interpolate(
    progress,
    [-1, 0, 1],
    [-c.maxRotation, 0, c.maxRotation],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    Math.abs(progress),
    [0, 1],
    [0, c.dropDistance],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, 0.6, c.minOpacity],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, 0.85],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { rotateZ: `${rotateZ}deg` },
      { translateY },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
