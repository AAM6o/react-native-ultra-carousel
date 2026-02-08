/**
 * @file Elastic animation preset
 * @description Elastic bounce effect — items stretch and bounce with overshoot
 * @preset elastic
 * @difficulty Hard
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the elastic animation */
export interface ElasticConfig {
  /** Elasticity multiplier controlling overshoot intensity (default: 1.3) */
  elasticity: number;
  /** Damping factor that reduces bounce amplitude (default: 0.7) */
  damping: number;
  /** Horizontal travel distance in pixels (default: 200) */
  distance: number;
}

/** Default elastic configuration */
export const ELASTIC_DEFAULTS: ElasticConfig = {
  elasticity: 1.3,
  damping: 0.7,
  distance: 200,
};

/**
 * Elastic animation worklet.
 * Creates a springy, elastic effect where items stretch along the axis
 * of motion and compress perpendicularly, with overshoot on translateX.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const elasticAnimation = (
  progress: number,
  config?: Partial<ElasticConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...ELASTIC_DEFAULTS, ...config };

  // Horizontal translation with elastic overshoot
  const translateX = interpolate(
    progress,
    [-1, -0.7, 0, 0.7, 1],
    [
      -c.distance,
      -c.distance * c.damping,
      0,
      c.distance * c.damping,
      c.distance,
    ],
    Extrapolation.CLAMP
  );

  // Stretch along X axis — compress at center, stretch when moving
  const scaleX = interpolate(
    Math.abs(progress),
    [0, 0.3, 0.6, 1],
    [1, c.elasticity, c.damping, 1],
    Extrapolation.CLAMP
  );

  // Compress along Y axis inversely to X stretch
  const scaleY = interpolate(
    Math.abs(progress),
    [0, 0.3, 0.6, 1],
    [1, 1 / c.elasticity, 1 / c.damping, 1],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, 0.8, 0.5],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateX },
      { scaleX },
      { scaleY },
    ],
    opacity,
    zIndex,
  };
};
