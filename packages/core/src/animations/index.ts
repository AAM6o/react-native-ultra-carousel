/**
 * @file Animation presets public exports
 * @description Export all animation presets and registry utilities
 */

export { slideAnimation, SLIDE_DEFAULTS } from './basic/slide';
export type { SlideConfig } from './basic/slide';

export { fadeAnimation, FADE_DEFAULTS } from './basic/fade';
export type { FadeConfig } from './basic/fade';

export { slideFadeAnimation, SLIDE_FADE_DEFAULTS } from './basic/slideFade';
export type { SlideFadeConfig } from './basic/slideFade';

export { scaleAnimation, SCALE_DEFAULTS } from './basic/scale';
export type { ScaleConfig } from './basic/scale';

export { scaleFadeAnimation, SCALE_FADE_DEFAULTS } from './basic/scaleFade';
export type { ScaleFadeConfig } from './basic/scaleFade';

export { verticalAnimation, VERTICAL_DEFAULTS } from './basic/vertical';
export type { VerticalConfig } from './basic/vertical';

export { verticalFadeAnimation, VERTICAL_FADE_DEFAULTS } from './basic/verticalFade';
export type { VerticalFadeConfig } from './basic/verticalFade';

export { parallaxAnimation, PARALLAX_DEFAULTS } from './basic/parallax';
export type { ParallaxConfig } from './basic/parallax';

export { overlapAnimation, OVERLAP_DEFAULTS } from './basic/overlap';
export type { OverlapConfig } from './basic/overlap';

export { peekAnimation, PEEK_DEFAULTS } from './basic/peek';
export type { PeekConfig } from './basic/peek';

export {
  registerPreset,
  getPreset,
  getPresetMeta,
  getAllPresetNames,
  getAllPresetMeta,
  isPresetRegistered,
} from './registry';

export type { AnimatedItemStyle, AnimationPresetFn, AnimationPresetMeta } from './types';
