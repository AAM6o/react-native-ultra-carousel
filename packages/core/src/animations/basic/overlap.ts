/**
 * @file Overlap animation preset
 * @description Items overlap each other by 30%, creating a stacked card appearance
 * @preset overlap
 * @difficulty Medium
 * @phase 1
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';
import { computeZIndex } from '../utils';

/** Configuration for the overlap animation */
export interface OverlapConfig {
  /** Overlap ratio — 0.7 means 30% overlap (default: 0.7) */
  overlapRatio: number;
  /** Scale of non-active items (default: 0.95) */
  minScale: number;
  /** Item width for offset calculations (default: 300) */
  itemWidth: number;
}

/** Default overlap configuration */
export const OVERLAP_DEFAULTS: OverlapConfig = {
  overlapRatio: 0.7,
  minScale: 0.95,
  itemWidth: 300,
};

/**
 * Overlap animation worklet.
 * Items translate at a reduced distance so they overlap.
 * Active item sits on top with highest zIndex.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const overlapAnimation = (
  progress: number,
  config?: Partial<OverlapConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...OVERLAP_DEFAULTS, ...config };

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-(c.itemWidth * c.overlapRatio), 0, c.itemWidth * c.overlapRatio],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  return {
    transform: [
      { translateX },
      { scale },
    ],
    zIndex: computeZIndex(progress),
    opacity: 1,
  };
};
