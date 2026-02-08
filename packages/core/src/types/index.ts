/**
 * @file Type re-exports
 * @description Central export point for all public types
 */

export type {
  CarouselProps,
  CarouselRef,
  PresetName,
  CarouselDirection,
  SnapAlignment,
  RenderItemInfo,
  GestureConfig,
  AutoPlayConfig,
} from './carousel';

export type {
  AnimatedItemStyle,
  AnimationPresetFn,
  CustomAnimationFn,
  AnimationPresetMeta,
} from './animation';

export type {
  GestureState,
  PanGestureConfig,
  SnapResult,
} from './gesture';

export type {
  PaginationConfig,
  PaginationRenderInfo,
  PaginationType,
  PaginationPosition,
  BasePaginationProps,
} from './pagination';

export type {
  CarouselPlugin,
  CreatePluginOptions,
} from './plugin';
