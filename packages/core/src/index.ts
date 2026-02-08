/**
 * @file react-native-ultra-carousel
 * @description The Ultimate Carousel Ecosystem for React Native
 * @author toankhontech
 * @license MIT
 */

// === Components ===
export { Carousel } from './components/Carousel';
export { Pagination } from './components/Pagination';
export { ParallaxImage } from './components/ParallaxImage';

// === Hooks ===
export { useCarousel } from './hooks/useCarousel';
export type { UseCarouselReturn } from './hooks/useCarousel';
export { useAnimationProgress } from './hooks/useAnimationProgress';
export { useItemAnimation } from './hooks/useItemAnimation';
export { useCarouselGesture } from './hooks/useCarouselGesture';
export { useAutoPlay } from './hooks/useAutoPlay';
export type { UseAutoPlayReturn } from './hooks/useAutoPlay';
export { useSnapPoints } from './hooks/useSnapPoints';
export { usePagination } from './hooks/usePagination';

// === Animations ===
export {
  // Basic
  slideAnimation,
  fadeAnimation,
  slideFadeAnimation,
  scaleAnimation,
  scaleFadeAnimation,
  verticalAnimation,
  verticalFadeAnimation,
  parallaxAnimation,
  overlapAnimation,
  peekAnimation,
  // Advanced
  stackAnimation,
  tinderAnimation,
  coverflowAnimation,
  cubeAnimation,
  flipAnimation,
  wheelAnimation,
  accordionAnimation,
  zoomAnimation,
  rotateAnimation,
  depthAnimation,
  // Creative
  newspaperAnimation,
  origamiAnimation,
  carousel3dAnimation,
  waveAnimation,
  spiralAnimation,
  glitchAnimation,
  morphAnimation,
  shutterAnimation,
  dominoAnimation,
  elasticAnimation,
  blurSlideAnimation,
  windmillAnimation,
  filmStripAnimation,
  helixAnimation,
  gravityAnimation,
  // Registry
  registerPreset,
  getPreset,
  getPresetMeta,
  getAllPresetNames,
  getAllPresetMeta,
  isPresetRegistered,
} from './animations';

// === Plugin System ===
export { createPlugin, PluginManager } from './plugins/PluginManager';

// === Types ===
export type {
  CarouselProps,
  CarouselRef,
  PresetName,
  CarouselDirection,
  SnapAlignment,
  RenderItemInfo,
  GestureConfig,
  AutoPlayConfig,
  AnimatedItemStyle,
  AnimationPresetFn,
  CustomAnimationFn,
  AnimationPresetMeta,
  CarouselPlugin,
  CreatePluginOptions,
  PaginationConfig,
  PaginationRenderInfo,
  PaginationType,
  PaginationPosition,
  BasePaginationProps,
  GestureState,
  PanGestureConfig,
  SnapResult,
} from './types';
