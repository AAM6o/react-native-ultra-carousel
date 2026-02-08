/**
 * @file ParallaxImage component
 * @description Image component with built-in parallax scrolling effect
 */

import React, { memo } from 'react';
import { StyleSheet, type ImageSourcePropType, type ViewStyle, type StyleProp } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';

/** Props for the ParallaxImage component */
export interface ParallaxImageProps {
  /** Image source */
  source: ImageSourcePropType;
  /** Container width */
  width: number;
  /** Container height */
  height: number;
  /** Animated scroll progress for this item */
  progress: SharedValue<number>;
  /** Parallax movement factor (default: 0.3) */
  parallaxFactor?: number;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * Parallax-aware image component for carousel items.
 * The image moves at a different speed than the container
 * to create a depth parallax effect.
 */
const ParallaxImageComponent: React.FC<ParallaxImageProps> = ({
  source,
  width,
  height,
  progress,
  parallaxFactor = 0.3,
  style,
}) => {
  const PARALLAX_OFFSET = width * parallaxFactor;

  const animatedImageStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [-1, 0, 1],
      [-PARALLAX_OFFSET, 0, PARALLAX_OFFSET],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View style={[styles.container, { width, height }, style]}>
      <Animated.Image
        source={source}
        style={[
          styles.image,
          {
            width: width + PARALLAX_OFFSET * 2,
            height,
            left: -PARALLAX_OFFSET,
          },
          animatedImageStyle,
        ]}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

ParallaxImageComponent.displayName = 'ParallaxImage';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
  },
});

export const ParallaxImage = memo(ParallaxImageComponent);
