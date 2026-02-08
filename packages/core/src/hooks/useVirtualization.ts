/**
 * @file useVirtualization hook
 * @description Computes which items should be rendered based on current scroll position
 */

import { useDerivedValue, type SharedValue } from 'react-native-reanimated';
import { DEFAULT_RENDER_BUFFER } from '../utils/constants';

/** Return type of the virtualization hook */
export interface VirtualizationResult {
  /** Indices of items that should be rendered */
  visibleIndices: SharedValue<number[]>;
}

/**
 * Determines which carousel items should be rendered for performance.
 * Only items within the visible range + buffer are rendered.
 *
 * @param scrollOffset - Current scroll offset shared value
 * @param totalItems - Total number of items
 * @param itemSize - Width or height of each item
 * @param gap - Gap between items
 * @param containerSize - Width or height of the container
 * @param maxRenderItems - Max items to render (0 = all)
 * @param renderBuffer - Extra items outside viewport to render
 * @returns Object containing the array of visible indices
 */
export const useVirtualization = (
  scrollOffset: SharedValue<number>,
  totalItems: number,
  itemSize: number,
  gap: number,
  containerSize: number,
  maxRenderItems: number = 0,
  renderBuffer: number = DEFAULT_RENDER_BUFFER
): VirtualizationResult => {
  const stepSize = itemSize + gap;

  const visibleIndices = useDerivedValue(() => {
    if (maxRenderItems === 0 || totalItems <= maxRenderItems) {
      return Array.from({ length: totalItems }, (_, i) => i);
    }

    if (stepSize === 0) {
      return [0];
    }

    const currentIndex = Math.round(scrollOffset.value / stepSize);
    const visibleCount = Math.ceil(containerSize / stepSize) + 1;
    const halfVisible = Math.ceil(visibleCount / 2);
    const start = Math.max(0, currentIndex - halfVisible - renderBuffer);
    const end = Math.min(totalItems - 1, currentIndex + halfVisible + renderBuffer);

    const indices: number[] = [];
    for (let i = start; i <= end; i++) {
      indices.push(i);
    }

    return indices;
  }, [totalItems, stepSize, containerSize, maxRenderItems, renderBuffer]);

  return { visibleIndices };
};
