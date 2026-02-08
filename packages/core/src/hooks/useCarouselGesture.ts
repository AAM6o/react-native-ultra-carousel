/**
 * @file useCarouselGesture hook
 * @description Orchestrates gesture handling for the carousel component
 */

import { useMemo } from 'react';
import type { GestureConfig, CarouselDirection } from '../types';
import { usePanGesture, type PanGestureOptions } from '../gestures/PanGestureManager';
import {
  DEFAULT_ACTIVE_OFFSET_X,
  DEFAULT_ACTIVE_OFFSET_Y,
  DEFAULT_VELOCITY_THRESHOLD,
} from '../utils/constants';

/** Options for the carousel gesture hook */
export interface UseCarouselGestureOptions {
  /** Total items in the carousel */
  totalItems: number;
  /** Size of each item */
  itemSize: number;
  /** Gap between items */
  gap: number;
  /** Snap points array */
  snapPoints: number[];
  /** Scroll direction */
  direction: CarouselDirection;
  /** Whether loop is enabled */
  loop: boolean;
  /** Whether interactions are enabled */
  enabled: boolean;
  /** Custom gesture config */
  gestureConfig?: GestureConfig;
  /** Index change callback */
  onIndexChange?: (index: number) => void;
  /** Scroll start callback */
  onScrollStart?: () => void;
  /** Scroll end callback */
  onScrollEnd?: (index: number) => void;
}

/**
 * Sets up gesture handling for the carousel.
 * Bridges user-facing gesture config with the internal PanGestureManager.
 *
 * @param options - Gesture configuration options
 * @returns Gesture, shared values, and snap control
 */
export const useCarouselGesture = (options: UseCarouselGestureOptions) => {
  const {
    totalItems,
    itemSize,
    gap,
    snapPoints,
    direction,
    loop,
    enabled,
    gestureConfig,
    onIndexChange,
    onScrollStart,
    onScrollEnd,
  } = options;

  const isHorizontal = direction === 'horizontal';

  const panOptions: PanGestureOptions = useMemo(() => {
    const activeOffsetX = gestureConfig?.activeOffsetX
      ? (Array.isArray(gestureConfig.activeOffsetX)
          ? gestureConfig.activeOffsetX
          : [-gestureConfig.activeOffsetX, gestureConfig.activeOffsetX]) as [number, number]
      : (isHorizontal ? DEFAULT_ACTIVE_OFFSET_X : DEFAULT_ACTIVE_OFFSET_Y);

    const activeOffsetY = gestureConfig?.activeOffsetY
      ? (Array.isArray(gestureConfig.activeOffsetY)
          ? gestureConfig.activeOffsetY
          : [-gestureConfig.activeOffsetY, gestureConfig.activeOffsetY]) as [number, number]
      : (isHorizontal ? DEFAULT_ACTIVE_OFFSET_Y : DEFAULT_ACTIVE_OFFSET_X);

    return {
      totalItems,
      itemSize,
      gap,
      snapPoints,
      isHorizontal,
      loop,
      enabled,
      activeOffsetX,
      activeOffsetY,
      velocityThreshold: gestureConfig?.velocityThreshold ?? DEFAULT_VELOCITY_THRESHOLD,
      onIndexChange,
      onScrollStart,
      onScrollEnd,
      onConfigurePanGesture: gestureConfig?.onConfigurePanGesture,
    };
  }, [
    totalItems,
    itemSize,
    gap,
    snapPoints,
    isHorizontal,
    loop,
    enabled,
    gestureConfig,
    onIndexChange,
    onScrollStart,
    onScrollEnd,
  ]);

  return usePanGesture(panOptions);
};
