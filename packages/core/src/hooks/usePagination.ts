/**
 * @file usePagination hook
 * @description Manages pagination state derived from scroll progress
 */

import { useDerivedValue, type SharedValue } from 'react-native-reanimated';

/** Return type of the pagination hook */
export interface UsePaginationReturn {
  /** Current page index as a shared value (for UI thread usage) */
  currentPage: SharedValue<number>;
}

/**
 * Derives the current page index from scroll offset.
 * Runs on the UI thread for smooth pagination indicator updates.
 *
 * @param scrollOffset - Current scroll offset shared value
 * @param itemSize - Width or height of each item
 * @param gap - Gap between items
 * @param totalItems - Total number of items
 * @returns Current page as shared value
 */
export const usePagination = (
  scrollOffset: SharedValue<number>,
  itemSize: number,
  gap: number,
  totalItems: number
): UsePaginationReturn => {
  const stepSize = itemSize + gap;

  const currentPage = useDerivedValue(() => {
    if (stepSize === 0 || totalItems === 0) return 0;
    const page = Math.round(scrollOffset.value / stepSize);
    return Math.max(0, Math.min(page, totalItems - 1));
  }, [stepSize, totalItems]);

  return { currentPage };
};
