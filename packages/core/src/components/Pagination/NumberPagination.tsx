/**
 * @file NumberPagination component
 * @description Numeric page indicator in "X / Y" format
 */

import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';
import type { BasePaginationProps } from '../../types';

/**
 * Number-based pagination indicator.
 * Displays current page and total in "X / Y" format with animated transitions.
 */
const NumberPaginationComponent: React.FC<BasePaginationProps> = ({
  totalItems,
  progress,
  activeColor,
  size,
  style,
}) => {
  const fontSize = size * 2;

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="text"
      accessibilityLabel={`Page ${Math.round(progress.value) + 1} of ${totalItems}`}
    >
      <NumberDisplay
        progress={progress}
        totalItems={totalItems}
        color={activeColor}
        fontSize={fontSize}
      />
    </View>
  );
};

NumberPaginationComponent.displayName = 'NumberPagination';

/** Props for the number display */
interface NumberDisplayProps {
  progress: SharedValue<number>;
  totalItems: number;
  color: string;
  fontSize: number;
}

/** Animated number display showing current/total */
const NumberDisplay: React.FC<NumberDisplayProps> = memo(({
  progress,
  totalItems,
  color,
  fontSize,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(progress.value - Math.round(progress.value)),
      [0, 0.5],
      [1, 0.5],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const currentPage = Math.round(progress.value) + 1;

  return (
    <Animated.View style={[styles.numberContainer, animatedStyle]}>
      <Text style={[styles.currentNumber, { color, fontSize }]}>
        {currentPage}
      </Text>
      <Text style={[styles.separator, { color, fontSize: fontSize * 0.8 }]}>
        {' / '}
      </Text>
      <Text style={[styles.totalNumber, { color, fontSize: fontSize * 0.8 }]}>
        {totalItems}
      </Text>
    </Animated.View>
  );
});

NumberDisplay.displayName = 'NumberDisplay';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currentNumber: {
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  separator: {
    fontWeight: '400',
    opacity: 0.6,
  },
  totalNumber: {
    fontWeight: '400',
    opacity: 0.6,
    fontVariant: ['tabular-nums'],
  },
});

export const NumberPagination = memo(NumberPaginationComponent);
