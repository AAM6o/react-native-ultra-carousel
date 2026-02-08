/**
 * @file Pagination component
 * @description Main pagination component that dispatches to the correct pagination style
 */

import React, { memo } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { PaginationConfig } from '../../types';
import { DotPagination } from './DotPagination';
import { BarPagination } from './BarPagination';
import { NumberPagination } from './NumberPagination';
import { ProgressPagination } from './ProgressPagination';
import { CustomPagination } from './CustomPagination';
import {
  DEFAULT_PAGINATION_ACTIVE_COLOR,
  DEFAULT_PAGINATION_INACTIVE_COLOR,
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGINATION_GAP,
} from '../../utils/constants';

/** Props for the main Pagination component */
export interface PaginationProps {
  /** Pagination configuration */
  config: PaginationConfig;
  /** Total number of items */
  totalItems: number;
  /** Current page progress shared value */
  progress: SharedValue<number>;
  /** Navigate to specific index */
  goToIndex: (index: number) => void;
}

/**
 * Main pagination component.
 * Renders the appropriate pagination style based on configuration.
 */
const PaginationComponent: React.FC<PaginationProps> = ({
  config,
  totalItems,
  progress,
  goToIndex,
}) => {
  const baseProps = {
    totalItems,
    progress,
    activeColor: config.activeColor ?? DEFAULT_PAGINATION_ACTIVE_COLOR,
    inactiveColor: config.inactiveColor ?? DEFAULT_PAGINATION_INACTIVE_COLOR,
    size: config.size ?? DEFAULT_PAGINATION_SIZE,
    gap: config.gap ?? DEFAULT_PAGINATION_GAP,
    goToIndex,
    style: config.style,
  };

  switch (config.type) {
    case 'dot':
      return <DotPagination {...baseProps} />;
    case 'bar':
      return <BarPagination {...baseProps} />;
    case 'number':
      return <NumberPagination {...baseProps} />;
    case 'progress':
      return <ProgressPagination {...baseProps} />;
    case 'custom':
      if (config.renderCustom) {
        return (
          <CustomPagination
            totalItems={totalItems}
            progress={progress}
            goToIndex={goToIndex}
            renderCustom={config.renderCustom}
          />
        );
      }
      return null;
    default:
      return <DotPagination {...baseProps} />;
  }
};

PaginationComponent.displayName = 'Pagination';

export const Pagination = memo(PaginationComponent);
