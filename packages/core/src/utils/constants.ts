/**
 * @file Default constants and configuration values
 * @description Central location for all magic numbers and default settings
 */

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Default carousel dimensions */
export const DEFAULT_WIDTH = SCREEN_WIDTH;
export const DEFAULT_HEIGHT = 250;

/** Default animation spring config */
export const DEFAULT_SPRING_CONFIG = {
  damping: 20,
  stiffness: 200,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
} as const;

/** Default gesture thresholds */
export const DEFAULT_ACTIVE_OFFSET_X: [number, number] = [-10, 10];
export const DEFAULT_ACTIVE_OFFSET_Y: [number, number] = [-50, 50];
export const DEFAULT_VELOCITY_THRESHOLD = 500;

/** Default auto play settings */
export const DEFAULT_AUTO_PLAY_INTERVAL = 3000;

/** Default pagination settings */
export const DEFAULT_PAGINATION_ACTIVE_COLOR = '#007AFF';
export const DEFAULT_PAGINATION_INACTIVE_COLOR = '#C7C7CC';
export const DEFAULT_PAGINATION_SIZE = 8;
export const DEFAULT_PAGINATION_GAP = 6;

/** Virtualization defaults */
export const DEFAULT_RENDER_BUFFER = 2;

/** Accessibility minimum touch target size */
export const MIN_TOUCH_TARGET = 44;

/** Screen dimensions for reference */
export { SCREEN_WIDTH, SCREEN_HEIGHT };
