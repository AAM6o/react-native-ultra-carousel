/**
 * @file Plugin type definitions
 * @description Types for the carousel plugin system
 */

import type { AnimatedItemStyle } from './animation';
import type { CarouselRef } from './carousel';

/** Plugin interface for extending carousel behavior */
export interface CarouselPlugin {
  /** Unique plugin name */
  name: string;
  /** Called when carousel initializes */
  onInit?: (carousel: CarouselRef) => void;
  /** Called on each animation frame (MUST be a worklet) */
  onAnimate?: (progress: number, index: number) => AnimatedItemStyle | void;
  /** Called when active index changes */
  onIndexChange?: (index: number) => void;
  /** Called when carousel is destroyed */
  onDestroy?: () => void;
}

/** Options for creating a plugin */
export type CreatePluginOptions = Omit<CarouselPlugin, 'name'> & {
  /** Unique plugin name */
  name: string;
};
