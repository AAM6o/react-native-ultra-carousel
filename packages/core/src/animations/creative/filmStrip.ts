/**
 * @file FilmStrip animation preset
 * @description Film strip effect — items slide with vertical offset and skew like a film reel
 * @preset filmStrip
 * @difficulty Medium
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the film strip animation */
export interface FilmStripConfig {
  /** Horizontal travel distance in pixels (default: 300) */
  distance: number;
  /** Vertical jitter offset in pixels to simulate sprocket movement (default: 20) */
  verticalOffset: number;
  /** Skew angle in degrees for motion distortion (default: 5) */
  skewAngle: number;
}

/** Default film strip configuration */
export const FILM_STRIP_DEFAULTS: FilmStripConfig = {
  distance: 300,
  verticalOffset: 20,
  skewAngle: 5,
};

/**
 * FilmStrip animation worklet.
 * Simulates an old-fashioned film strip by combining a horizontal slide
 * with vertical jitter and a slight skew, reminiscent of celluloid
 * passing through a projector gate.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const filmStripAnimation = (
  progress: number,
  config?: Partial<FilmStripConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...FILM_STRIP_DEFAULTS, ...config };

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-c.distance, 0, c.distance],
    Extrapolation.CLAMP
  );

  // Vertical jitter — peaks in the middle of the transition
  const translateY = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [0, c.verticalOffset, 0],
    Extrapolation.CLAMP
  );

  const skewY = interpolate(
    progress,
    [-1, 0, 1],
    [c.skewAngle, 0, -c.skewAngle],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, 0.85, 0.6],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, 0.95],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateX },
      { translateY },
      { skewY: `${skewY}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
