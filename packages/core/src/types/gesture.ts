/**
 * @file Gesture type definitions
 * @description Types for gesture handling and touch interaction
 */

/** Gesture state during a pan interaction */
export interface GestureState {
  /** Current translation in X axis */
  translationX: number;
  /** Current translation in Y axis */
  translationY: number;
  /** Current velocity in X axis */
  velocityX: number;
  /** Current velocity in Y axis */
  velocityY: number;
  /** Whether the gesture is currently active */
  isActive: boolean;
}

/** Configuration for the pan gesture manager */
export interface PanGestureConfig {
  /** Active offset thresholds for X axis */
  activeOffsetX: [number, number];
  /** Active offset thresholds for Y axis */
  activeOffsetY: [number, number];
  /** Velocity threshold for fling detection */
  velocityThreshold: number;
  /** Whether the carousel scrolls horizontally */
  isHorizontal: boolean;
  /** Width/height of each item (for snap calculations) */
  itemSize: number;
  /** Whether fling gesture is enabled */
  enableFling: boolean;
}

/** Result of snap point calculation */
export interface SnapResult {
  /** Target index to snap to */
  targetIndex: number;
  /** Target offset in pixels */
  targetOffset: number;
}
