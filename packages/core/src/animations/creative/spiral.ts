/**
 * @file Spiral animation preset
 * @description Spiral motion — items spiral outward with rotation and scaling
 * @preset spiral
 * @difficulty Hard
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the spiral animation */
export interface SpiralConfig {
  /** Spiral radius in pixels at full distance (default: 150) */
  radius: number;
  /** Degrees of self-rotation per unit of progress (default: 180) */
  rotationSpeed: number;
  /** Minimum scale at the outermost spiral point (default: 0.6) */
  minScale: number;
}

/** Default spiral configuration */
export const SPIRAL_DEFAULTS: SpiralConfig = {
  radius: 150,
  rotationSpeed: 180,
  minScale: 0.6,
};

/**
 * Spiral animation worklet.
 * Items spiral outward from the centre: distance from the origin grows with
 * |progress|, and the polar angle increases proportionally, creating a
 * logarithmic-spiral feel. Self-rotation is layered on top, and scale
 * decreases as items move outward.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const spiralAnimation = (
  progress: number,
  config?: Partial<SpiralConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...SPIRAL_DEFAULTS, ...config };

  // Polar-coordinate spiral: distance grows with |progress|
  const distance = interpolate(
    Math.abs(progress),
    [0, 2],
    [0, c.radius],
    Extrapolation.CLAMP
  );

  // Angle on the spiral increases with progress (sign determines direction)
  const spiralAngleDeg = progress * c.rotationSpeed;
  const spiralAngleRad = (spiralAngleDeg * Math.PI) / 180;

  // Convert polar to cartesian
  const translateX = distance * Math.cos(spiralAngleRad);
  const translateY = distance * Math.sin(spiralAngleRad);

  // Self-rotation: items spin as they move outward
  const rotate = interpolate(
    progress,
    [-2, 0, 2],
    [-c.rotationSpeed * 2, 0, c.rotationSpeed * 2],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    Math.abs(progress),
    [0, 2],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 1.5, 2],
    [1, 0.6, 0.2],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 2], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateX },
      { translateY },
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
