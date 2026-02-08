/**
 * @file Accordion animation preset
 * @description Fold/unfold effect — items collapse like an accordion
 * @preset accordion
 * @difficulty Hard
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the accordion animation */
export interface AccordionConfig {
  /** Maximum fold angle in degrees (default: 90) */
  foldAngle: number;
  /** 3D perspective distance (default: 800) */
  perspective: number;
  /** Minimum opacity when folded (default: 0.3) */
  minOpacity: number;
}

/** Default accordion configuration */
export const ACCORDION_DEFAULTS: AccordionConfig = {
  foldAngle: 90,
  perspective: 800,
  minOpacity: 0.3,
};

/**
 * Accordion animation worklet.
 * Items fold along the X axis as they transition, simulating paper folding.
 * Active item is flat (0 rotation), adjacent items fold away.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const accordionAnimation = (
  progress: number,
  config?: Partial<AccordionConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...ACCORDION_DEFAULTS, ...config };

  const rotateX = interpolate(
    progress,
    [-1, 0, 1],
    [c.foldAngle, 0, -c.foldAngle],
    Extrapolation.CLAMP
  );

  const scaleY = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, 0.5],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minOpacity],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    progress,
    [-1, 0, 1],
    [-100, 0, 100],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { perspective: c.perspective },
      { translateY },
      { rotateX: `${rotateX}deg` },
      { scaleY },
    ],
    opacity,
    zIndex,
    overflow: 'hidden',
  };
};
