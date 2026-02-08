/**
 * @file Zoom animation preset
 * @description Zoom in/out transition — active item zooms to full size from miniature
 * @preset zoom
 * @difficulty Medium
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the zoom animation */
export interface ZoomConfig {
  /** Minimum scale for zoomed-out state (default: 0.5) */
  minScale: number;
  /** Minimum opacity for zoomed-out state (default: 0.4) */
  minOpacity: number;
  /** Border radius at zoomed-out state (default: 16) */
  borderRadius: number;
}

/** Default zoom configuration */
export const ZOOM_DEFAULTS: ZoomConfig = {
  minScale: 0.5,
  minOpacity: 0.4,
  borderRadius: 16,
};

/**
 * Zoom animation worklet.
 * Active item is at full scale. As items move away from center,
 * they zoom out to a miniature size with reduced opacity and rounded corners.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const zoomAnimation = (
  progress: number,
  config?: Partial<ZoomConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...ZOOM_DEFAULTS, ...config };

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minOpacity],
    Extrapolation.CLAMP
  );

  const borderRadius = interpolate(
    Math.abs(progress),
    [0, 1],
    [0, c.borderRadius],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [{ scale }],
    opacity,
    zIndex,
    borderRadius: Math.round(borderRadius),
    overflow: 'hidden',
  };
};
