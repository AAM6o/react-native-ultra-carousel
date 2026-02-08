/**
 * @file useItemAnimation hook
 * @description Applies animation preset to a carousel item based on scroll progress
 */

import { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';
import type { AnimationPresetFn, CustomAnimationFn } from '../types';
import { getPreset } from '../animations/registry';

/**
 * Applies an animation preset to a carousel item.
 * Returns an animated style that can be applied to an Animated.View.
 *
 * @param progress - Shared value with normalized animation progress
 * @param preset - Preset name string or custom animation function
 * @param animationConfig - Optional config overrides for the preset
 * @param index - Item index (for custom animation functions)
 * @param totalItems - Total number of items (for custom animation functions)
 * @returns Animated style for the item
 */
export const useItemAnimation = (
  progress: SharedValue<number>,
  preset: string | CustomAnimationFn | undefined,
  animationConfig?: Record<string, number>,
  index: number = 0,
  totalItems: number = 0
) => {
  return useAnimatedStyle(() => {
    if (!preset) {
      return {};
    }

    if (typeof preset === 'function') {
      return preset(progress.value, index, totalItems, animationConfig) as Record<string, unknown>;
    }

    const animFn = getPreset(preset) as AnimationPresetFn | undefined;
    if (!animFn) {
      return {};
    }

    return animFn(progress.value, animationConfig) as Record<string, unknown>;
  }, [preset, animationConfig, index, totalItems]);
};
