/**
 * @file Depth animation preset
 * @description Depth-of-field effect — items recede into the distance
 * @preset depth
 * @difficulty Medium
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the depth animation */
export interface DepthConfig {
  /** 3D perspective distance (default: 1000) */
  perspective: number;
  /** Scale of items in the background (default: 0.7) */
  minScale: number;
  /** Opacity of background items (default: 0.4) */
  minOpacity: number;
  /** Horizontal offset (default: 80) */
  offsetX: number;
  /** Simulated Z-depth offset (default: 200) */
  depthOffset: number;
}

/** Default depth configuration */
export const DEPTH_DEFAULTS: DepthConfig = {
  perspective: 1000,
  minScale: 0.7,
  minOpacity: 0.4,
  offsetX: 80,
  depthOffset: 200,
};

/**
 * Depth animation worklet.
 * Active item is in the foreground at full size. Adjacent items
 * recede into the background with reduced scale, opacity, and
 * a subtle horizontal offset.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const depthAnimation = (
  progress: number,
  config?: Partial<DepthConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...DEPTH_DEFAULTS, ...config };

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

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { perspective: c.perspective },
      { translateX },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
