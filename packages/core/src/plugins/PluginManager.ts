/**
 * @file Plugin manager
 * @description Registry and lifecycle manager for carousel plugins
 */

import type { CarouselPlugin, CreatePluginOptions } from './types';
import type { CarouselRef, AnimatedItemStyle } from '../types';

/**
 * Creates a carousel plugin with the given options.
 *
 * @param options - Plugin configuration including lifecycle hooks
 * @returns A fully typed CarouselPlugin instance
 *
 * @example
 * ```ts
 * const analyticsPlugin = createPlugin({
 *   name: 'analytics',
 *   onIndexChange: (index) => {
 *     analytics.track('carousel_swipe', { index });
 *   },
 * });
 * ```
 */
export const createPlugin = (options: CreatePluginOptions): CarouselPlugin => {
  return { ...options };
};

/**
 * Manages a collection of plugins for a carousel instance.
 * Handles lifecycle calls and animation composition.
 */
export class PluginManager {
  private plugins: CarouselPlugin[] = [];
  private initialized = false;

  /**
   * Creates a new PluginManager instance.
   *
   * @param plugins - Initial array of plugins to manage
   */
  constructor(plugins: CarouselPlugin[] = []) {
    this.plugins = [...plugins];
  }

  /**
   * Registers a new plugin.
   *
   * @param plugin - The plugin to add
   */
  register(plugin: CarouselPlugin): void {
    if (this.plugins.some((p) => p.name === plugin.name)) {
      console.warn(
        `[ultra-carousel] Plugin "${plugin.name}" is already registered. Skipping.`
      );
      return;
    }
    this.plugins.push(plugin);
  }

  /**
   * Removes a plugin by name.
   *
   * @param name - Name of the plugin to remove
   */
  unregister(name: string): void {
    const index = this.plugins.findIndex((p) => p.name === name);
    if (index !== -1) {
      this.plugins[index].onDestroy?.();
      this.plugins.splice(index, 1);
    }
  }

  /**
   * Initializes all registered plugins with the carousel ref.
   *
   * @param carousel - The carousel instance ref
   */
  init(carousel: CarouselRef): void {
    if (this.initialized) return;
    this.plugins.forEach((plugin) => {
      plugin.onInit?.(carousel);
    });
    this.initialized = true;
  }

  /**
   * Calls onAnimate on all plugins and merges returned styles.
   * This runs on the UI thread (worklet context).
   *
   * @param progress - Current animation progress
   * @param index - Current item index
   * @returns Merged animated style from all plugins
   */
  animate(progress: number, index: number): AnimatedItemStyle {
    'worklet';
    const mergedStyle: AnimatedItemStyle = {};

    for (const plugin of this.plugins) {
      if (plugin.onAnimate) {
        const result = plugin.onAnimate(progress, index);
        if (result) {
          if (result.opacity !== undefined) {
            mergedStyle.opacity = result.opacity;
          }
          if (result.zIndex !== undefined) {
            mergedStyle.zIndex = result.zIndex;
          }
          if (result.transform) {
            mergedStyle.transform = [
              ...(mergedStyle.transform ?? []),
              ...result.transform,
            ];
          }
        }
      }
    }

    return mergedStyle;
  }

  /**
   * Notifies all plugins of an index change.
   *
   * @param index - The new active index
   */
  notifyIndexChange(index: number): void {
    this.plugins.forEach((plugin) => {
      plugin.onIndexChange?.(index);
    });
  }

  /**
   * Destroys all plugins and cleans up.
   */
  destroy(): void {
    this.plugins.forEach((plugin) => {
      plugin.onDestroy?.();
    });
    this.plugins = [];
    this.initialized = false;
  }

  /**
   * Returns the number of registered plugins.
   */
  get count(): number {
    return this.plugins.length;
  }
}
