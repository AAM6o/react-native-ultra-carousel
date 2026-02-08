/**
 * @file Tinder animation preset
 * @description Tinder-style swipe cards with rotation and stack behind
 * @preset tinder
 * @difficulty Hard
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the tinder animation */
export interface TinderConfig {
  /** Maximum rotation angle in degrees when swiping (default: 15) */
  maxRotation: number;
  /** Number of cards visible in the stack behind (default: 3) */
  stackDepth: number;
  /** Scale reduction per stack level (default: 0.06) */
  scaleStep: number;
  /** Vertical offset per stack level (default: 12) */
  offsetY: number;
  /** Horizontal throw distance (default: 500) */
  throwDistance: number;
}

/** Default tinder configuration */
export const TINDER_DEFAULTS: TinderConfig = {
  maxRotation: 15,
  stackDepth: 3,
  scaleStep: 0.06,
  offsetY: 12,
  throwDistance: 500,
};

/**
 * Tinder animation worklet.
 * Top card follows the swipe with rotation. Cards behind scale and
 * translate upward progressively. Dismissed card flies off-screen.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const tinderAnimation = (
  progress: number,
  config?: Partial<TinderConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...TINDER_DEFAULTS, ...config };

  if (progress < 0) {
    const translateX = interpolate(
      progress,
      [-1, 0],
      [-c.throwDistance, 0],
      Extrapolation.CLAMP
    );

    const rotate = interpolate(
      progress,
      [-1, 0],
      [-c.maxRotation, 0],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      progress,
      [-1, -0.6, 0],
      [0, 0.7, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX },
        { rotate: `${rotate}deg` },
      ],
      opacity,
      zIndex: 100,
    };
  }

  const clampedProgress = Math.min(progress, c.stackDepth);

  const scale = interpolate(
    clampedProgress,
    [0, c.stackDepth],
    [1, 1 - c.scaleStep * c.stackDepth],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    clampedProgress,
    [0, c.stackDepth],
    [0, -c.offsetY * c.stackDepth],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    clampedProgress,
    [0, c.stackDepth - 1, c.stackDepth],
    [1, 1, 0],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(clampedProgress, [0, c.stackDepth], [99, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateY },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
