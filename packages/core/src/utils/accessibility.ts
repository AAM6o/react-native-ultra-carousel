/**
 * @file Accessibility utility functions
 * @description Helpers for building accessible carousel experiences
 */

import type { AccessibilityProps } from 'react-native';

/**
 * Generates accessibility props for the carousel container.
 *
 * @param label - Custom accessibility label
 * @param currentIndex - Current active index
 * @param totalItems - Total number of items
 * @returns Accessibility props object
 */
export const getCarouselAccessibilityProps = (
  label: string | undefined,
  currentIndex: number,
  totalItems: number
): AccessibilityProps => ({
  accessible: true,
  accessibilityRole: 'adjustable',
  accessibilityLabel: label ?? 'Carousel',
  accessibilityValue: {
    text: `Item ${currentIndex + 1} of ${totalItems}`,
    min: 0,
    max: totalItems - 1,
    now: currentIndex,
  },
  accessibilityActions: [
    { name: 'increment', label: 'Next item' },
    { name: 'decrement', label: 'Previous item' },
  ],
});

/**
 * Generates accessibility props for a carousel item.
 *
 * @param index - Item index
 * @param totalItems - Total number of items
 * @param isActive - Whether this item is currently active
 * @returns Accessibility props for the item
 */
export const getItemAccessibilityProps = (
  index: number,
  totalItems: number,
  isActive: boolean
): AccessibilityProps => ({
  accessible: true,
  accessibilityRole: 'button',
  accessibilityLabel: `Item ${index + 1} of ${totalItems}`,
  accessibilityState: {
    selected: isActive,
  },
});

/**
 * Generates accessibility props for pagination.
 *
 * @param currentIndex - Current active page
 * @param totalItems - Total number of pages
 * @returns Accessibility props for pagination container
 */
export const getPaginationAccessibilityProps = (
  currentIndex: number,
  totalItems: number
): AccessibilityProps => ({
  accessible: true,
  accessibilityRole: 'tablist' as AccessibilityProps['accessibilityRole'],
  accessibilityLabel: `Page ${currentIndex + 1} of ${totalItems}`,
});
