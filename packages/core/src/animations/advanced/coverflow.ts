/**
 * @file Coverflow animation preset
 * @description Apple CoverFlow-style 3D perspective carousel effect
 * @preset coverflow
 * @difficulty Hard
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the coverflow animation */
export interface CoverflowConfig {
  /** Maximum Y-axis rotation angle in degrees (default: 45) */
  rotateY: number;
  /** Scale of inactive items (default: 0.85) */
  scale: number;
  /** Opacity of inactive items (default: 0.6) */
  opacity: number;
  /** 3D perspective distance (default: 1000) */
  perspective: number;
  /** Horizontal offset of inactive items (default: 50) */
  offsetX: number;
}

/** Default coverflow configuration */
export const COVERFLOW_DEFAULTS: CoverflowConfig = {
  rotateY: 45,
  scale: 0.85,
  opacity: 0.6,
  perspective: 1000,
  offsetX: 50,
};

/**
 * Coverflow animation worklet.
 * Creates an Apple CoverFlow 3D perspective with Y-axis rotation,
 * scaling, and depth-based opacity.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const coverflowAnimation = (
  progress: number,
  config?: Partial<CoverflowConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...COVERFLOW_DEFAULTS, ...config };

  const rotateY = interpolate(
    progress,
    [-1, 0, 1],
    [c.rotateY, 0, -c.rotateY],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    progress,
    [-1, 0, 1],
    [c.scale, 1, c.scale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    progress,
    [-1, 0, 1],
    [c.opacity, 1, c.opacity],
    Extrapolation.CLAMP
  );

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-c.offsetX, 0, c.offsetX],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { perspective: c.perspective },
      { translateX },
      { rotateY: `${rotateY}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
