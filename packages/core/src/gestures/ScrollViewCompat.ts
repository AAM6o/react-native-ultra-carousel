/**
 * @file ScrollView compatibility manager
 * @description Resolves gesture conflicts between carousel and parent ScrollView
 */

import { Gesture } from 'react-native-gesture-handler';

/**
 * Configures a pan gesture for compatibility with a parent ScrollView.
 * Sets appropriate active offsets so horizontal swipes activate the carousel
 * while vertical swipes pass through to the ScrollView.
 *
 * @param panGesture - The pan gesture to configure
 * @param isHorizontal - Whether the carousel scrolls horizontally
 * @returns The configured gesture
 */
export const configureScrollViewCompat = (
  panGesture: ReturnType<typeof Gesture.Pan>,
  isHorizontal: boolean
) => {
  if (isHorizontal) {
    panGesture.activeOffsetX([-10, 10]).activeOffsetY([-50, 50]);
  } else {
    panGesture.activeOffsetY([-10, 10]).activeOffsetX([-50, 50]);
  }

  return panGesture;
};
