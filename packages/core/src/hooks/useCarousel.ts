/**
 * @file useCarousel hook
 * @description Main hook for external carousel control and state management
 */

import { useCallback, useRef, useState } from 'react';
import type { CarouselRef } from '../types';

/** Return type of the useCarousel hook */
export interface UseCarouselReturn {
  /** Ref to attach to the Carousel component */
  ref: React.RefObject<CarouselRef>;
  /** Current active index (reactive) */
  activeIndex: number;
  /** Total number of items (set when carousel mounts) */
  totalItems: number;
  /** Scroll to a specific index */
  scrollTo: (index: number, animated?: boolean) => void;
  /** Go to next item */
  next: (animated?: boolean) => void;
  /** Go to previous item */
  prev: (animated?: boolean) => void;
  /** Whether carousel is currently animating */
  isAnimating: boolean;
  /** Auto play controls */
  autoPlay: {
    start: () => void;
    stop: () => void;
    pause: () => void;
    isPlaying: boolean;
  };
  /** Internal: callback for carousel to report index changes */
  _onIndexChange: (index: number) => void;
  /** Internal: callback for carousel to report total items */
  _setTotalItems: (count: number) => void;
}

/**
 * External hook for controlling and observing a Carousel component.
 * Attach the returned ref to a Carousel component for full control.
 *
 * @returns Carousel control interface
 *
 * @example
 * ```tsx
 * const carousel = useCarousel();
 *
 * <Carousel ref={carousel.ref} data={data} renderItem={renderItem} />
 * <Button onPress={carousel.next} title="Next" />
 * <Text>{carousel.activeIndex + 1} / {carousel.totalItems}</Text>
 * ```
 */
export const useCarousel = (): UseCarouselReturn => {
  const ref = useRef<CarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollTo = useCallback((index: number, animated = true) => {
    setIsAnimating(true);
    ref.current?.scrollTo(index, animated);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const next = useCallback((animated = true) => {
    setIsAnimating(true);
    ref.current?.next(animated);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const prev = useCallback((animated = true) => {
    setIsAnimating(true);
    ref.current?.prev(animated);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  const startAutoPlay = useCallback(() => {
    ref.current?.startAutoPlay();
    setIsPlaying(true);
  }, []);

  const stopAutoPlay = useCallback(() => {
    ref.current?.stopAutoPlay();
    setIsPlaying(false);
  }, []);

  const pauseAutoPlay = useCallback(() => {
    ref.current?.pauseAutoPlay();
    setIsPlaying(false);
  }, []);

  const _onIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const _setTotalItems = useCallback((count: number) => {
    setTotalItems(count);
  }, []);

  return {
    ref,
    activeIndex,
    totalItems,
    scrollTo,
    next,
    prev,
    isAnimating,
    autoPlay: {
      start: startAutoPlay,
      stop: stopAutoPlay,
      pause: pauseAutoPlay,
      isPlaying,
    },
    _onIndexChange,
    _setTotalItems,
  };
};
