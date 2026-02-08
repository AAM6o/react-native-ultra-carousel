/**
 * @file Basic carousel template
 * @description Starter template for a simple carousel component
 */

export const basicCarouselTemplate = `import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Carousel, useCarousel } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  color: string;
}

const DATA: SlideItem[] = [
  { id: '1', title: 'Welcome', subtitle: 'Swipe to explore', color: '#FF6B6B' },
  { id: '2', title: 'Beautiful', subtitle: '35+ animation presets', color: '#4ECDC4' },
  { id: '3', title: 'Flexible', subtitle: 'Fully customizable', color: '#45B7D1' },
  { id: '4', title: 'Fast', subtitle: '60 FPS on UI thread', color: '#96CEB4' },
];

export const BasicCarousel = () => {
  const carousel = useCarousel();

  return (
    <View style={styles.container}>
      <Carousel
        ref={carousel.ref}
        data={DATA}
        renderItem={({ item }) => (
          <View style={[styles.slide, { backgroundColor: item.color }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
        preset="slide"
        width={SCREEN_WIDTH}
        height={250}
        pagination
        autoPlay
        autoPlayInterval={4000}
      />
      <Text style={styles.counter}>
        {carousel.activeIndex + 1} / {DATA.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  counter: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: '#888',
  },
});
`;
