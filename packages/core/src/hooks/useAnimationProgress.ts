/**
 * @file useAnimationProgress hook
 * @description Computes normalized animation progress for each carousel item
 */

import { useDerivedValue, type SharedValue } from 'react-native-reanimated';

/**
 * Computes the normalized animation progress for a specific item.
 * Progress of 0 means the item is fully active/centered.
 * Progress of -1 means the item is one position to the left (prev).
 * Progress of +1 means the item is one position to the right (next).
 *
 * @param index - The item index
 * @param scrollOffset - The current scroll offset shared value
 * @param itemSize - Width or height of each item
 * @param gap - Gap between items
 * @returns Shared value containing the normalized progress
 */
export const useAnimationProgress = (
  index: number,
  scrollOffset: SharedValue<number>,
  itemSize: number,
  gap: number
): SharedValue<number> => {
  const stepSize = itemSize + gap;

  return useDerivedValue(() => {
    if (stepSize === 0) return 0;
    const itemOffset = index * stepSize;
    return (scrollOffset.value - itemOffset) / stepSize;
  }, [index, stepSize]);
};
