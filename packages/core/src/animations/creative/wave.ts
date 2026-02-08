/**
 * @file Wave animation preset
 * @description Sine wave motion — items bob up and down in a wave pattern
 * @preset wave
 * @difficulty Medium
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the wave animation */
export interface WaveConfig {
  /** Maximum vertical displacement in pixels (default: 50) */
  amplitude: number;
  /** Number of wave cycles across the visible range (default: 2) */
  frequency: number;
}

/** Default wave configuration */
export const WAVE_DEFAULTS: WaveConfig = {
  amplitude: 50,
  frequency: 2,
};

/**
 * Wave animation worklet.
 * Items follow a sine wave path: each item's vertical position is determined
 * by sin(progress * frequency * PI), producing smooth undulation. Scale
 * decreases at wave peaks to add depth. Phase offset is inherent because
 * each item has a different progress value.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const waveAnimation = (
  progress: number,
  config?: Partial<WaveConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...WAVE_DEFAULTS, ...config };

  // Sine wave displacement — each item sits at a different phase
  const phase = progress * c.frequency * Math.PI;
  const translateY = Math.sin(phase) * c.amplitude;

  // Items at the peaks of the wave are slightly smaller for depth
  const absWave = Math.abs(Math.sin(phase));
  const scale = interpolate(
    absWave,
    [0, 1],
    [1, 0.85],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 2, 3],
    [1, 0.7, 0.3],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 3], [100, 0], Extrapolation.CLAMP)
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
