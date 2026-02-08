/**
 * @file Wheel animation preset
 * @description Ferris wheel circular motion — items move along a circular path
 * @preset wheel
 * @difficulty Hard
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the wheel animation */
export interface WheelConfig {
  /** Radius of the wheel in pixels (default: 200) */
  radius: number;
  /** Angular span per item in degrees (default: 30) */
  anglePerItem: number;
  /** Scale at the farthest point (default: 0.7) */
  minScale: number;
  /** Opacity at the farthest point (default: 0.5) */
  minOpacity: number;
}

/** Default wheel configuration */
export const WHEEL_DEFAULTS: WheelConfig = {
  radius: 200,
  anglePerItem: 30,
  minScale: 0.7,
  minOpacity: 0.5,
};

/**
 * Wheel animation worklet.
 * Items are positioned along a circular arc. The active item sits at the
 * bottom-center, and adjacent items arc upward and to the sides.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const wheelAnimation = (
  progress: number,
  config?: Partial<WheelConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...WHEEL_DEFAULTS, ...config };

  const angleDeg = progress * c.anglePerItem;
  const angleRad = (angleDeg * Math.PI) / 180;

  const translateX = c.radius * Math.sin(angleRad);
  const translateY = c.radius * (1 - Math.cos(angleRad));

  const scale = interpolate(
    Math.abs(progress),
    [0, 2],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 2],
    [1, c.minOpacity],
    Extrapolation.CLAMP
  );

  const rotate = interpolate(
    progress,
    [-2, 0, 2],
    [-c.anglePerItem * 2, 0, c.anglePerItem * 2],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 2], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateX },
      { translateY: -translateY },
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
