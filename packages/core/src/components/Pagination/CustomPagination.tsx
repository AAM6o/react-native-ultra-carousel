/**
 * @file CustomPagination component
 * @description Renders user-provided custom pagination via render function
 */

import React, { memo } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { PaginationRenderInfo } from '../../types';

/** Props for the CustomPagination component */
export interface CustomPaginationProps {
  /** Total number of items */
  totalItems: number;
  /** Animated scroll progress */
  progress: SharedValue<number>;
  /** Navigate to specific index */
  goToIndex: (index: number) => void;
  /** User-provided render function */
  renderCustom: (info: PaginationRenderInfo) => React.ReactNode;
}

/**
 * Custom pagination that delegates rendering to a user-provided function.
 * Passes all pagination state to the render function.
 */
const CustomPaginationComponent: React.FC<CustomPaginationProps> = ({
  totalItems,
  progress,
  goToIndex,
  renderCustom,
}) => {
  const currentIndex = Math.round(progress.value);

  return (
    <>
      {renderCustom({
        currentIndex,
        totalItems,
        progress,
        goToIndex,
      })}
    </>
  );
};

CustomPaginationComponent.displayName = 'CustomPagination';

export const CustomPagination = memo(CustomPaginationComponent);
