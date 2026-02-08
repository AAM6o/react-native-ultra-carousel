/**
 * @file Image gallery template
 * @description Image gallery carousel with parallax and fullscreen
 */

export const imageGalleryTemplate = `import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Carousel } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface GalleryImage {
  id: string;
  uri: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        preset="parallax"
        width={SCREEN_WIDTH}
        height={300}
        pagination={{ type: 'dot', position: 'bottom' }}
        gap={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
});
`;
