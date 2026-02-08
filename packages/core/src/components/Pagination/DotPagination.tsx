/**
 * @file DotPagination component
 * @description Animated dot indicators for carousel pagination
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

/**
 * Dot-based pagination indicator.
 * Active dot scales up and changes color smoothly based on scroll progress.
 */
const DotPaginationComponent: React.FC<BasePaginationProps> = ({
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
        <DotIndicator
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

DotPaginationComponent.displayName = 'DotPagination';

/** Props for an individual dot */
interface DotIndicatorProps {
  index: number;
  progress: SharedValue<number>;
  activeColor: string;
  inactiveColor: string;
  size: number;
  gap: number;
  goToIndex: (index: number) => void;
}

/** Individual animated dot indicator */
const DotIndicator: React.FC<DotIndicatorProps> = memo(({
  index,
  progress,
  activeColor,
  inactiveColor,
  size,
  gap,
  goToIndex,
}) => {
  const ACTIVE_SCALE = 1.4;

  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(progress.value - index);

    const scale = interpolate(
      distance,
      [0, 1],
      [ACTIVE_SCALE, 1],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      distance,
      [0, 1],
      [1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
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
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            marginHorizontal: gap / 2,
            backgroundColor: isActive ? activeColor : inactiveColor,
          },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
});

DotIndicator.displayName = 'DotIndicator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  dot: {
    // dynamic styles applied inline
  },
});

export const DotPagination = memo(DotPaginationComponent);
