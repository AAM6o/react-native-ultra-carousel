/**
 * @file BarPagination component
 * @description Thin bar indicators with animated active width
 */

import React, { memo } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';
import type { BasePaginationProps } from '../../types';

/** Width multiplier for active bar */
const ACTIVE_WIDTH_MULTIPLIER = 2.5;
/** Bar height in pixels */
const BAR_HEIGHT = 3;

/**
 * Bar-based pagination indicator.
 * Active bar stretches wider with smooth animation.
 */
const BarPaginationComponent: React.FC<BasePaginationProps> = ({
  totalItems,
  progress,
  activeColor,
  inactiveColor,
  size,
  gap,
  goToIndex,
  style,
}) => {
  return (
    <View style={[styles.container, style]} accessibilityRole="tablist">
      {Array.from({ length: totalItems }).map((_, index) => (
        <BarIndicator
          key={index}
          index={index}
          progress={progress}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          size={size}
          gap={gap}
          goToIndex={goToIndex}
        />
      ))}
    </View>
  );
};

BarPaginationComponent.displayName = 'BarPagination';

/** Props for an individual bar */
interface BarIndicatorProps {
  index: number;
  progress: SharedValue<number>;
  activeColor: string;
  inactiveColor: string;
  size: number;
  gap: number;
  goToIndex: (index: number) => void;
}

/** Individual animated bar indicator */
const BarIndicator: React.FC<BarIndicatorProps> = memo(({
  index,
  progress,
  activeColor,
  inactiveColor,
  size,
  gap,
  goToIndex,
}) => {
  const baseWidth = size * 2;

  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(progress.value - index);

    const width = interpolate(
      distance,
      [0, 1],
      [baseWidth * ACTIVE_WIDTH_MULTIPLIER, baseWidth],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      distance,
      [0, 1],
      [1, 0.4],
      Extrapolation.CLAMP
    );

    return {
      width,
      opacity,
    };
  });

  const isActive = Math.round(progress.value) === index;

  return (
    <Pressable
      onPress={() => goToIndex(index)}
      accessibilityRole="tab"
      accessibilityLabel={`Page ${index + 1}`}
      accessibilityState={{ selected: isActive }}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            height: BAR_HEIGHT,
            borderRadius: BAR_HEIGHT / 2,
            marginHorizontal: gap / 2,
            backgroundColor: isActive ? activeColor : inactiveColor,
          },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
});

BarIndicator.displayName = 'BarIndicator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  bar: {
    // dynamic styles applied inline
  },
});

export const BarPagination = memo(BarPaginationComponent);
