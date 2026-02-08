/**
 * @file CarouselItem component
 * @description Wraps each carousel item with animation and accessibility
 */

import React, { memo } from 'react';
import { StyleSheet, type ViewStyle, type StyleProp } from 'react-native';
import Animated, { type SharedValue } from 'react-native-reanimated';
import type { CustomAnimationFn } from '../types';
import { useAnimationProgress } from '../hooks/useAnimationProgress';
import { useItemAnimation } from '../hooks/useItemAnimation';
import { getItemAccessibilityProps } from '../utils/accessibility';

/** Props for the CarouselItem component */
export interface CarouselItemProps {
  /** Item index in the data array */
  index: number;
  /** Total number of items */
  totalItems: number;
  /** Current scroll offset shared value */
  scrollOffset: SharedValue<number>;
  /** Item width in pixels */
  itemWidth: number;
  /** Item height in pixels */
  itemHeight: number;
  /** Gap between items */
  gap: number;
  /** Animation preset name or custom function */
  preset?: string | CustomAnimationFn;
  /** Animation config overrides */
  animationConfig?: Record<string, number>;
  /** Whether this item is currently active */
  isActive: boolean;
  /** Whether accessibility features are enabled */
  accessible: boolean;
  /** Custom item container style */
  style?: StyleProp<ViewStyle>;
  /** Content to render inside the item */
  children: React.ReactNode;
}

/**
 * Individual carousel item wrapper component.
 * Applies animation transforms based on scroll progress.
 */
const CarouselItemComponent: React.FC<CarouselItemProps> = ({
  index,
  totalItems,
  scrollOffset,
  itemWidth,
  itemHeight,
  gap,
  preset,
  animationConfig,
  isActive,
  accessible,
  style,
  children,
}) => {
  const progress = useAnimationProgress(index, scrollOffset, itemWidth, gap);
  const animatedStyle = useItemAnimation(
    progress,
    preset,
    animationConfig,
    index,
    totalItems
  );

  const a11yProps = accessible
    ? getItemAccessibilityProps(index, totalItems, isActive)
    : {};

  return (
    <Animated.View
      style={[
        styles.item,
        { width: itemWidth, height: itemHeight },
        animatedStyle,
        style,
      ]}
      {...a11yProps}
    >
      {children}
    </Animated.View>
  );
};

CarouselItemComponent.displayName = 'CarouselItem';

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export const CarouselItem = memo(CarouselItemComponent);
