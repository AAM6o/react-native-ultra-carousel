/**
 * @file useSnapPoints hook
 * @description Computes snap points for carousel items based on layout parameters
 */

import { useMemo } from 'react';
import type { SnapAlignment } from '../types';
import { calculateSnapPoints } from '../utils/layout';

/**
 * Computes an array of snap point offsets for the carousel.
 *
 * @param totalItems - Number of items
 * @param itemSize - Width or height of each item
 * @param gap - Gap between items
 * @param containerSize - Width or height of the container
 * @param alignment - Snap alignment mode
 * @returns Memoized array of snap point offsets
 */
export const useSnapPoints = (
  totalItems: number,
  itemSize: number,
  gap: number,
  containerSize: number,
  alignment: SnapAlignment
): number[] => {
  return useMemo(
    () => calculateSnapPoints(totalItems, itemSize, gap, containerSize, alignment),
    [totalItems, itemSize, gap, containerSize, alignment]
  );
};
