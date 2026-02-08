/**
 * @file Layout calculation utilities
 * @description Helpers for carousel layout, snap points, and item positioning
 */

import type { SnapAlignment } from '../types';
import { DEFAULT_WIDTH } from './constants';

/**
 * Calculates the offset for snap alignment.
 *
 * @param containerSize - Container width or height
 * @param itemSize - Item width or height
 * @param alignment - Snap alignment mode
 * @returns Alignment offset in pixels
 */
export const getAlignmentOffset = (
  containerSize: number,
  itemSize: number,
  alignment: SnapAlignment
): number => {
  'worklet';
  switch (alignment) {
    case 'start':
      return 0;
    case 'center':
      return (containerSize - itemSize) / 2;
    case 'end':
      return containerSize - itemSize;
  }
};

/**
 * Calculates snap point for a given index.
 *
 * @param index - Item index
 * @param itemSize - Item width or height
 * @param gap - Gap between items
 * @param alignmentOffset - Offset from alignment calculation
 * @returns Snap point offset in pixels
 */
export const getSnapPoint = (
  index: number,
  itemSize: number,
  gap: number,
  alignmentOffset: number
): number => {
  'worklet';
  return index * (itemSize + gap) - alignmentOffset;
};

/**
 * Calculates all snap points for the carousel.
 *
 * @param totalItems - Number of items
 * @param itemSize - Item width or height
 * @param gap - Gap between items
 * @param containerSize - Container width or height
 * @param alignment - Snap alignment
 * @returns Array of snap point offsets
 */
export const calculateSnapPoints = (
  totalItems: number,
  itemSize: number,
  gap: number,
  containerSize: number,
  alignment: SnapAlignment
): number[] => {
  const offset = getAlignmentOffset(containerSize, itemSize, alignment);
  const points: number[] = [];
  for (let i = 0; i < totalItems; i++) {
    points.push(getSnapPoint(i, itemSize, gap, offset));
  }
  return points;
};

/**
 * Finds the nearest snap point index for a given offset.
 *
 * @param offset - Current scroll offset
 * @param snapPoints - Array of snap point offsets
 * @returns Index of the nearest snap point
 */
export const findNearestSnapIndex = (
  offset: number,
  snapPoints: number[]
): number => {
  'worklet';
  let nearestIndex = 0;
  let nearestDistance = Math.abs(offset - snapPoints[0]);

  for (let i = 1; i < snapPoints.length; i++) {
    const distance = Math.abs(offset - snapPoints[i]);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = i;
    }
  }

  return nearestIndex;
};

/**
 * Calculates effective item size, defaulting to container width.
 *
 * @param itemSize - Explicit item size (or undefined)
 * @param containerSize - Container size as fallback
 * @returns Effective item size
 */
export const getEffectiveItemSize = (
  itemSize: number | undefined,
  containerSize: number | undefined
): number => {
  return itemSize ?? containerSize ?? DEFAULT_WIDTH;
};
