/**
 * @file Onboarding template
 * @description Onboarding flow carousel with progress and skip/done buttons
 */

export const onboardingTemplate = `import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Carousel, useCarousel } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

const STEPS: OnboardingStep[] = [
  {
    id: '1',
    title: 'Welcome',
    description: 'Discover our amazing app and all its features',
    emoji: '\\u{1F44B}',
    color: '#6C5CE7',
  },
  {
    id: '2',
    title: 'Explore',
    description: 'Browse through content curated just for you',
    emoji: '\\u{1F50D}',
    color: '#00B894',
  },
  {
    id: '3',
    title: 'Get Started',
    description: 'Create your account and begin your journey',
    emoji: '\\u{1F680}',
    color: '#E17055',
  },
];

interface OnboardingCarouselProps {
  onComplete: () => void;
}

export const OnboardingCarousel = ({ onComplete }: OnboardingCarouselProps) => {
  const carousel = useCarousel();
  const isLastStep = carousel.activeIndex === STEPS.length - 1;

  const handleNext = useCallback(() => {
    if (isLastStep) {
      onComplete();
    } else {
      carousel.next();
    }
  }, [isLastStep, onComplete, carousel]);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carousel.ref}
        data={STEPS}
        renderItem={({ item }) => (
          <View style={[styles.step, { backgroundColor: item.color }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        preset="scale-fade"
        width={SCREEN_WIDTH}
        height={400}
        pagination={{ type: 'progress' }}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={onComplete}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>{isLastStep ? 'Done' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  step: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 24,
    marginHorizontal: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#888',
  },
  nextButton: {
    backgroundColor: '#333',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
`;
