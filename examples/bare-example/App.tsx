/**
 * React Native bare workflow example
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

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];

const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Card ${i + 1}`,
  color,
}));

const PRESETS: PresetName[] = [
  'slide', 'fade', 'scale', 'coverflow', 'cube',
  'flip', 'stack', 'tinder', 'newspaper', 'wave',
];

export default function App() {
  const [preset, setPreset] = useState<PresetName>('slide');
  const carousel = useCarousel();

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Ultra Carousel</Text>
          <Text style={styles.subtitle}>Bare Workflow Example</Text>

          <View style={styles.carouselWrap}>
            <Carousel
              ref={carousel.ref}
              data={DATA}
              renderItem={({ item }) => (
                <View style={[styles.card, { backgroundColor: item.color }]}>
                  <Text style={styles.cardText}>{item.title}</Text>
                  <Text style={styles.presetText}>{preset}</Text>
                </View>
              )}
              preset={preset}
              width={SCREEN_WIDTH - 40}
              height={220}
              pagination
              gap={10}
            />
          </View>

          <Text style={styles.counter}>
            {carousel.activeIndex + 1} / {DATA.length}
          </Text>

          <View style={styles.chips}>
            {PRESETS.map((p) => (
              <TouchableOpacity
                key={p}
                style={[styles.chip, preset === p && styles.chipActive]}
                onPress={() => setPreset(p)}
              >
                <Text style={[styles.chipText, preset === p && styles.chipTextActive]}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 24,
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  carouselWrap: { alignItems: 'center' },
  card: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { fontSize: 22, fontWeight: '700', color: '#fff' },
  presetText: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  counter: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 40,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
  },
  chipActive: { backgroundColor: '#333' },
  chipText: { fontSize: 12, color: '#555', fontWeight: '500' },
  chipTextActive: { color: '#fff' },
});
