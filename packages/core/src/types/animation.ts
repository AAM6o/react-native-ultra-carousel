/**
 * @file Animation type definitions
 * @description Types for animation presets, styles, and configuration
 */

/** Style object returned by animation functions */
export interface AnimatedItemStyle {
  transform?: Array<
    | { translateX: number }
    | { translateY: number }
    | { scale: number }
    | { scaleX: number }
    | { scaleY: number }
    | { rotate: string }
    | { rotateX: string }
    | { rotateY: string }
    | { rotateZ: string }
    | { skewX: string }
    | { skewY: string }
    | { perspective: number }
  >;
  opacity?: number;
  zIndex?: number;
  elevation?: number;
  borderRadius?: number;
  overflow?: 'visible' | 'hidden';
}

/**
 * Animation preset function signature.
 * All presets must follow this contract.
 *
 * @param progress - Normalized scroll progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional configuration overrides
 * @returns Animated style to apply to the carousel item
 */
export type AnimationPresetFn = (
  progress: number,
  config?: Record<string, number>
) => AnimatedItemStyle;

/**
 * Custom animation function signature (extended version with more context).
 *
 * @param progress - Normalized progress for this item
 * @param index - Item index in the data array
 * @param totalItems - Total number of items
 * @param config - Optional configuration overrides
 * @returns Animated style to apply to the carousel item
 */
export type CustomAnimationFn = (
  progress: number,
  index: number,
  totalItems: number,
  config?: Record<string, number>
) => AnimatedItemStyle;

/** Metadata for a registered animation preset */
export interface AnimationPresetMeta {
  /** Unique preset name */
  name: string;
  /** Human-readable description */
  description: string;
  /** Difficulty level */
  difficulty: 'Easy' | 'Medium' | 'Hard';
  /** Phase when it was added */
  phase: 1 | 2 | 3;
  /** The animation function */
  animation: AnimationPresetFn;
  /** Default configuration values */
  defaults: Record<string, number>;
}
