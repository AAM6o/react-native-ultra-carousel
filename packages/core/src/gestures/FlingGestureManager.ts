/**
 * @file Fling gesture manager
 * @description Handles fling gesture for quick navigation between carousel items
 */

import { Gesture } from 'react-native-gesture-handler';
import { useMemo } from 'react';

/** Options for fling gesture configuration */
export interface FlingGestureOptions {
  /** Whether the carousel scrolls horizontally */
  isHorizontal: boolean;
  /** Whether fling gesture is enabled */
  enabled: boolean;
  /** Callback when fling is detected in forward direction */
  onFlingForward: () => void;
  /** Callback when fling is detected in backward direction */
  onFlingBackward: () => void;
}

/**
 * Creates fling gestures for quick carousel navigation.
 *
 * @param options - Fling gesture configuration
 * @returns Composed fling gesture
 */
export const useFlingGesture = (options: FlingGestureOptions) => {
  const { isHorizontal, enabled, onFlingForward, onFlingBackward } = options;

  const flingForward = useMemo(() => {
    return Gesture.Fling()
      .direction(isHorizontal ? 1 : 8)
      .enabled(enabled)
      .onEnd(() => {
        onFlingBackward();
      });
  }, [isHorizontal, enabled, onFlingBackward]);

  const flingBackward = useMemo(() => {
    return Gesture.Fling()
      .direction(isHorizontal ? 2 : 4)
      .enabled(enabled)
      .onEnd(() => {
        onFlingForward();
      });
  }, [isHorizontal, enabled, onFlingForward]);

  return { flingForward, flingBackward };
};
