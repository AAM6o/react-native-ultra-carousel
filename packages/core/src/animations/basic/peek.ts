/**
 * @file Peek animation preset
 * @description Active item centered with adjacent items peeking from the sides
 * @preset peek
 * @difficulty Medium
 * @category basic
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the peek animation */
export interface PeekConfig {
  /** How much of the adjacent item is visible — 0.2 = 20% (default: 0.2) */
  peekAmount: number;
  /** Scale of peeking items (default: 0.85) */
  peekScale: number;
  /** Opacity of peeking items (default: 0.7) */
  peekOpacity: number;
  /** Item width for peek offset calculations (default: 300) */
  itemWidth: number;
}

/** Default peek configuration */
export const PEEK_DEFAULTS: PeekConfig = {
  peekAmount: 0.2,
  peekScale: 0.85,
  peekOpacity: 0.7,
  itemWidth: 300,
};

/**
 * Peek animation worklet.
 * Centers the active item while showing edges of adjacent items.
 * Peeking items are scaled down and slightly faded.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const peekAnimation = (
  progress: number,
  config?: Partial<PeekConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...PEEK_DEFAULTS, ...config };

  const peekOffset = c.itemWidth * (1 - c.peekAmount);

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-peekOffset, 0, peekOffset],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.peekScale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.peekOpacity],
    Extrapolation.CLAMP
  );

  return {
    transform: [
      { translateX },
      { scale },
    ],
    opacity,
  };
};
