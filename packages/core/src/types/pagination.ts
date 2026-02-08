/**
 * @file Pagination type definitions
 * @description Types for pagination indicators and controls
 */

import type { ViewStyle, StyleProp } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

/** Pagination display type */
export type PaginationType = 'dot' | 'bar' | 'number' | 'progress' | 'custom';

/** Pagination position relative to the carousel */
export type PaginationPosition = 'top' | 'bottom' | 'left' | 'right';

/** Information passed to custom pagination renderer */
export interface PaginationRenderInfo {
  /** Current active index */
  currentIndex: number;
  /** Total number of items */
  totalItems: number;
  /** Animated scroll progress */
  progress: SharedValue<number>;
  /** Navigate to specific index */
  goToIndex: (index: number) => void;
}

/** Pagination configuration */
export interface PaginationConfig {
  /** Type of pagination indicator */
  type: PaginationType;
  /** Position relative to carousel */
  position?: PaginationPosition;
  /** Color of active indicator */
  activeColor?: string;
  /** Color of inactive indicators */
  inactiveColor?: string;
  /** Size of indicator elements */
  size?: number;
  /** Gap between indicators */
  gap?: number;
  /** Custom style for pagination container */
  style?: StyleProp<ViewStyle>;
  /** Custom render function for pagination */
  renderCustom?: (info: PaginationRenderInfo) => React.ReactNode;
}

/** Props shared across all pagination components */
export interface BasePaginationProps {
  /** Total number of items */
  totalItems: number;
  /** Animated scroll progress value */
  progress: SharedValue<number>;
  /** Active indicator color */
  activeColor: string;
  /** Inactive indicator color */
  inactiveColor: string;
  /** Indicator size */
  size: number;
  /** Gap between indicators */
  gap: number;
  /** Navigate to specific index */
  goToIndex: (index: number) => void;
  /** Container style */
  style?: StyleProp<ViewStyle>;
}
