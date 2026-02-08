/**
 * @file Platform-specific utility helpers
 * @description Abstractions for platform differences between iOS and Android
 */

import { Platform, AccessibilityInfo } from 'react-native';

/** Whether the current platform is iOS */
export const isIOS = Platform.OS === 'ios';

/** Whether the current platform is Android */
export const isAndroid = Platform.OS === 'android';

/** Whether the current platform is web */
export const isWeb = Platform.OS === 'web';

/**
 * Checks if a screen reader is currently active.
 *
 * @returns Promise resolving to true if screen reader is enabled
 */
export const isScreenReaderEnabled = async (): Promise<boolean> => {
  return AccessibilityInfo.isScreenReaderEnabled();
};

/**
 * Checks if reduce motion is enabled in system settings.
 *
 * @returns Promise resolving to true if reduce motion is on
 */
export const isReduceMotionEnabled = async (): Promise<boolean> => {
  return AccessibilityInfo.isReduceMotionEnabled();
};
