/**
 * @file Glitch animation preset
 * @description Digital glitch effect — horizontal jitter and opacity flicker during transitions
 * @preset glitch
 * @difficulty Medium
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the glitch animation */
export interface GlitchConfig {
  /** Maximum horizontal jitter offset in pixels (default: 10) */
  intensity: number;
  /** Amount of opacity flicker from 0 to 1 (default: 0.3) */
  flickerAmount: number;
}

/** Default glitch configuration */
export const GLITCH_DEFAULTS: GlitchConfig = {
  intensity: 10,
  flickerAmount: 0.3,
};

/**
 * Glitch animation worklet.
 * Simulates a digital glitch: during transitions (progress !== 0) the item
 * jitters horizontally and its opacity flickers. When fully centred the item
 * is perfectly stable. The jitter is derived deterministically from progress
 * using sin-based pseudo-noise so the effect is smooth and reproducible on
 * the UI thread.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const glitchAnimation = (
  progress: number,
  config?: Partial<GlitchConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...GLITCH_DEFAULTS, ...config };

  // Glitch factor: 0 when centred, ramps up during transitions
  const glitchFactor = interpolate(
    Math.abs(progress),
    [0, 0.1, 0.5, 1],
    [0, 0.8, 1, 1],
    Extrapolation.CLAMP
  );

  // Deterministic pseudo-noise from progress for horizontal jitter
  const noise1 = Math.sin(progress * 127.1) * 43758.5453;
  const jitter1 = noise1 - Math.floor(noise1); // 0..1
  const noise2 = Math.sin(progress * 269.5) * 17593.1537;
  const jitter2 = noise2 - Math.floor(noise2); // 0..1

  const translateX = (jitter1 - 0.5) * 2 * c.intensity * glitchFactor;

  // Opacity flicker: base opacity with noise-driven dip
  const baseOpacity = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, 0.4],
    Extrapolation.CLAMP
  );
  const flicker = jitter2 * c.flickerAmount * glitchFactor;
  const opacity = Math.max(0, baseOpacity - flicker);

  // Slight vertical jitter adds to the broken-screen feel
  const translateY = (jitter2 - 0.5) * c.intensity * 0.5 * glitchFactor;

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateX },
      { translateY },
    ],
    opacity,
    zIndex,
  };
};
