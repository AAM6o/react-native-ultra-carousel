/**
 * @file Carousel3D animation preset
 * @description True 3D circular carousel — items arranged on a circle in 3D space
 * @preset carousel3d
 * @difficulty Hard
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the 3D carousel animation */
export interface Carousel3DConfig {
  /** Radius of the circular arrangement in pixels (default: 300) */
  radius: number;
  /** 3D perspective distance (default: 1200) */
  perspective: number;
  /** Subtle vertical tilt in degrees applied via rotateX (default: 10) */
  tilt: number;
}

/** Default 3D carousel configuration */
export const CAROUSEL3D_DEFAULTS: Carousel3DConfig = {
  radius: 300,
  perspective: 1200,
  tilt: 10,
};

/**
 * Carousel3D animation worklet.
 * Positions items along a 3D circle. Each item's angle on the circle is
 * derived from its progress. Items facing the camera appear larger and fully
 * opaque; items rotating away shrink and fade. rotateY follows the angle,
 * and translateX/translateZ place the item on the circle via sin/cos.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const carousel3dAnimation = (
  progress: number,
  config?: Partial<Carousel3DConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...CAROUSEL3D_DEFAULTS, ...config };

  // Each full progress unit corresponds to 60 degrees on the circle
  const angleDeg = interpolate(
    progress,
    [-3, 0, 3],
    [-180, 0, 180],
    Extrapolation.CLAMP
  );
  const angleRad = (angleDeg * Math.PI) / 180;

  // Position on the circle using sin/cos
  const translateX = c.radius * Math.sin(angleRad);
  const translateZ = c.radius * (1 - Math.cos(angleRad));

  // Items facing away appear smaller because they are farther from camera
  const scale = interpolate(
    translateZ,
    [0, c.radius * 2],
    [1, 0.5],
    Extrapolation.CLAMP
  );

  const rotateY = angleDeg;

  const opacity = interpolate(
    Math.abs(angleDeg),
    [0, 90, 180],
    [1, 0.6, 0.2],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(translateZ, [0, c.radius * 2], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { perspective: c.perspective },
      { translateX },
      { rotateY: `${rotateY}deg` },
      { rotateX: `${c.tilt}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
