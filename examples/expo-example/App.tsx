/**
 * @file Expo example app entry
 * @description Demonstrates various carousel presets and features
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Carousel, useCarousel } from 'react-native-ultra-carousel';
import type { PresetName } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Slide ${i + 1}`,
  color,
}));

const BASIC_PRESETS: PresetName[] = [
  'slide', 'fade', 'slide-fade', 'scale', 'scale-fade',
  'vertical', 'vertical-fade', 'parallax', 'overlap', 'peek',
];

const ADVANCED_PRESETS: PresetName[] = [
  'stack', 'tinder', 'coverflow', 'cube', 'flip',
  'wheel', 'accordion', 'zoom', 'rotate', 'depth',
];

const CREATIVE_PRESETS: PresetName[] = [
  'newspaper', 'origami', 'carousel-3d', 'wave', 'spiral',
  'glitch', 'morph', 'shutter', 'domino', 'elastic',
  'blur-slide', 'windmill', 'film-strip', 'helix', 'gravity',
];

export default function App() {
  const [activePreset, setActivePreset] = useState<PresetName>('slide');
  const carousel = useCarousel();

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Ultra Carousel</Text>
          <Text style={styles.subheader}>35+ Animation Presets</Text>

          <View style={styles.carouselContainer}>
            <Carousel
              ref={carousel.ref}
              data={DATA}
              renderItem={({ item }) => (
                <View style={[styles.card, { backgroundColor: item.color }]}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.presetLabel}>{activePreset}</Text>
                </View>
              )}
              preset={activePreset}
              width={SCREEN_WIDTH - 40}
              height={200}
              pagination
              gap={12}
            />
          </View>

          <Text style={styles.counter}>
            {carousel.activeIndex + 1} / {DATA.length}
          </Text>

          <Text style={styles.sectionTitle}>Basic</Text>
          <PresetGrid presets={BASIC_PRESETS} active={activePreset} onSelect={setActivePreset} />

          <Text style={styles.sectionTitle}>Advanced</Text>
          <PresetGrid presets={ADVANCED_PRESETS} active={activePreset} onSelect={setActivePreset} />

          <Text style={styles.sectionTitle}>Creative</Text>
          <PresetGrid presets={CREATIVE_PRESETS} active={activePreset} onSelect={setActivePreset} />

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

interface PresetGridProps {
  presets: PresetName[];
  active: PresetName;
  onSelect: (preset: PresetName) => void;
}

const PresetGrid = ({ presets, active, onSelect }: PresetGridProps) => (
  <View style={styles.presetGrid}>
    {presets.map((preset) => (
      <TouchableOpacity
        key={preset}
        style={[
          styles.presetChip,
          active === preset && styles.presetChipActive,
        ]}
        onPress={() => onSelect(preset)}
      >
        <Text
          style={[
            styles.presetChipText,
            active === preset && styles.presetChipTextActive,
          ]}
        >
          {preset}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: '#1a1a2e',
  },
  subheader: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  presetLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  counter: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  presetChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e9ecef',
  },
  presetChipActive: {
    backgroundColor: '#333',
  },
  presetChipText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  presetChipTextActive: {
    color: '#fff',
  },
  spacer: {
    height: 40,
  },
});
