/**
 * @file Stack animation preset
 * @description Cards stack on top of each other — swipe reveals the next card underneath
 * @preset stack
 * @difficulty Medium
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the stack animation */
export interface StackConfig {
  /** Scale reduction per stack level (default: 0.05) */
  scaleStep: number;
  /** Vertical offset per stack level in pixels (default: 10) */
  offsetY: number;
  /** Maximum number of visible stacked cards (default: 5) */
  maxStack: number;
  /** Horizontal swipe distance (default: 400) */
  swipeDistance: number;
}

/** Default stack configuration */
export const STACK_DEFAULTS: StackConfig = {
  scaleStep: 0.05,
  offsetY: 10,
  maxStack: 5,
  swipeDistance: 400,
};

/**
 * Stack animation worklet.
 * Active card sits on top at full size. Cards behind are progressively
 * smaller and offset upward. Swiped card translates out horizontally.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const stackAnimation = (
  progress: number,
  config?: Partial<StackConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...STACK_DEFAULTS, ...config };

  if (progress < 0) {
    const translateX = interpolate(
      progress,
      [-1, 0],
      [-c.swipeDistance, 0],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      progress,
      [-1, -0.5, 0],
      [0, 0.8, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX }],
      opacity,
      zIndex: 100,
    };
  }

  const clampedProgress = Math.min(progress, c.maxStack);

  const scale = interpolate(
    clampedProgress,
    [0, c.maxStack],
    [1, 1 - c.scaleStep * c.maxStack],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    clampedProgress,
    [0, c.maxStack],
    [0, -c.offsetY * c.maxStack],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    clampedProgress,
    [0, c.maxStack - 1, c.maxStack],
    [1, 1, 0],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(clampedProgress, [0, c.maxStack], [100, 0], Extrapolation.CLAMP)
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
