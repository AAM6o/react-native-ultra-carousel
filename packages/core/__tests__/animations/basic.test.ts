/**
 * @file Basic animation presets unit tests
 * @description Tests for all 10 Phase 1 animation presets
 */

import { slideAnimation, SLIDE_DEFAULTS } from '../../src/animations/basic/slide';
import { fadeAnimation, FADE_DEFAULTS } from '../../src/animations/basic/fade';
import { slideFadeAnimation, SLIDE_FADE_DEFAULTS } from '../../src/animations/basic/slideFade';
import { scaleAnimation, SCALE_DEFAULTS } from '../../src/animations/basic/scale';
import { scaleFadeAnimation, SCALE_FADE_DEFAULTS } from '../../src/animations/basic/scaleFade';
import { verticalAnimation, VERTICAL_DEFAULTS } from '../../src/animations/basic/vertical';
import { verticalFadeAnimation, VERTICAL_FADE_DEFAULTS } from '../../src/animations/basic/verticalFade';
import { parallaxAnimation, PARALLAX_DEFAULTS } from '../../src/animations/basic/parallax';
import { overlapAnimation, OVERLAP_DEFAULTS } from '../../src/animations/basic/overlap';
import { peekAnimation, PEEK_DEFAULTS } from '../../src/animations/basic/peek';
import type { AnimatedItemStyle } from '../../src/types';

const getTransformValue = (
  style: AnimatedItemStyle,
  key: string
): number | string | undefined => {
  const entry = style.transform?.find((t) => key in t);
  if (entry) {
    return (entry as Record<string, number | string>)[key];
  }
  return undefined;
};

describe('slide animation', () => {
  it('returns identity transform at progress=0', () => {
    const style = slideAnimation(0);
    expect(getTransformValue(style, 'translateX')).toBe(0);
    expect(style.opacity).toBe(1);
  });

  it('translates left at progress=-1', () => {
    const style = slideAnimation(-1);
    expect(getTransformValue(style, 'translateX')).toBeLessThan(0);
  });

  it('translates right at progress=1', () => {
    const style = slideAnimation(1);
    expect(getTransformValue(style, 'translateX')).toBeGreaterThan(0);
  });

  it('is symmetric', () => {
    const left = slideAnimation(-0.5);
    const right = slideAnimation(0.5);
    const txLeft = Math.abs(getTransformValue(left, 'translateX') as number);
    const txRight = Math.abs(getTransformValue(right, 'translateX') as number);
    expect(txLeft).toBeCloseTo(txRight);
  });

  it('accepts config overrides', () => {
    const style1 = slideAnimation(1, { distance: 1 });
    const style2 = slideAnimation(1, { distance: 2 });
    const tx1 = getTransformValue(style1, 'translateX') as number;
    const tx2 = getTransformValue(style2, 'translateX') as number;
    expect(tx2).toBeGreaterThan(tx1);
  });

  it('handles extreme progress values without crashing', () => {
    expect(() => slideAnimation(-100)).not.toThrow();
    expect(() => slideAnimation(100)).not.toThrow();
  });
});

describe('fade animation', () => {
  it('returns full opacity at progress=0', () => {
    const style = fadeAnimation(0);
    expect(style.opacity).toBe(1);
  });

  it('returns minimum opacity at progress=1', () => {
    const style = fadeAnimation(1);
    expect(style.opacity).toBe(FADE_DEFAULTS.minOpacity);
  });

  it('returns minimum opacity at progress=-1', () => {
    const style = fadeAnimation(-1);
    expect(style.opacity).toBe(FADE_DEFAULTS.minOpacity);
  });

  it('sets zIndex based on distance from active', () => {
    const active = fadeAnimation(0);
    const neighbor = fadeAnimation(1);
    expect(active.zIndex).toBeGreaterThan(neighbor.zIndex!);
  });

  it('is symmetric', () => {
    const left = fadeAnimation(-0.5);
    const right = fadeAnimation(0.5);
    expect(left.opacity).toBeCloseTo(right.opacity!);
  });

  it('accepts config overrides', () => {
    const style = fadeAnimation(1, { minOpacity: 0.5 });
    expect(style.opacity).toBe(0.5);
  });

  it('handles extreme values', () => {
    expect(() => fadeAnimation(-50)).not.toThrow();
    expect(() => fadeAnimation(50)).not.toThrow();
  });
});

describe('slide-fade animation', () => {
  it('returns identity at progress=0', () => {
    const style = slideFadeAnimation(0);
    expect(getTransformValue(style, 'translateX')).toBe(0);
    expect(style.opacity).toBe(1);
  });

  it('has both translation and opacity change at progress=1', () => {
    const style = slideFadeAnimation(1);
    expect(getTransformValue(style, 'translateX')).toBeGreaterThan(0);
    expect(style.opacity).toBeLessThan(1);
  });

  it('is symmetric', () => {
    const left = slideFadeAnimation(-0.5);
    const right = slideFadeAnimation(0.5);
    expect(left.opacity).toBeCloseTo(right.opacity!);
  });

  it('handles extreme values', () => {
    expect(() => slideFadeAnimation(-100)).not.toThrow();
    expect(() => slideFadeAnimation(100)).not.toThrow();
  });
});

describe('scale animation', () => {
  it('returns full scale at progress=0', () => {
    const style = scaleAnimation(0);
    expect(getTransformValue(style, 'scale')).toBe(1);
  });

  it('returns minimum scale at progress=1', () => {
    const style = scaleAnimation(1);
    expect(getTransformValue(style, 'scale')).toBe(SCALE_DEFAULTS.minScale);
  });

  it('is symmetric', () => {
    const left = scaleAnimation(-0.5);
    const right = scaleAnimation(0.5);
    const scaleLeft = getTransformValue(left, 'scale') as number;
    const scaleRight = getTransformValue(right, 'scale') as number;
    expect(scaleLeft).toBeCloseTo(scaleRight);
  });

  it('handles extreme values', () => {
    expect(() => scaleAnimation(-100)).not.toThrow();
    expect(() => scaleAnimation(100)).not.toThrow();
  });
});

describe('scale-fade animation', () => {
  it('returns identity at progress=0', () => {
    const style = scaleFadeAnimation(0);
    expect(getTransformValue(style, 'scale')).toBe(1);
    expect(style.opacity).toBe(1);
  });

  it('reduces both scale and opacity at progress=1', () => {
    const style = scaleFadeAnimation(1);
    expect(getTransformValue(style, 'scale')).toBeLessThan(1);
    expect(style.opacity).toBeLessThan(1);
  });

  it('is symmetric', () => {
    const left = scaleFadeAnimation(-0.5);
    const right = scaleFadeAnimation(0.5);
    expect(left.opacity).toBeCloseTo(right.opacity!);
  });

  it('handles extreme values', () => {
    expect(() => scaleFadeAnimation(-100)).not.toThrow();
    expect(() => scaleFadeAnimation(100)).not.toThrow();
  });
});

describe('vertical animation', () => {
  it('returns identity at progress=0', () => {
    const style = verticalAnimation(0);
    expect(getTransformValue(style, 'translateY')).toBe(0);
  });

  it('translates up at progress=-1', () => {
    const style = verticalAnimation(-1);
    expect(getTransformValue(style, 'translateY')).toBeLessThan(0);
  });

  it('translates down at progress=1', () => {
    const style = verticalAnimation(1);
    expect(getTransformValue(style, 'translateY')).toBeGreaterThan(0);
  });

  it('is symmetric', () => {
    const up = verticalAnimation(-0.5);
    const down = verticalAnimation(0.5);
    const tyUp = Math.abs(getTransformValue(up, 'translateY') as number);
    const tyDown = Math.abs(getTransformValue(down, 'translateY') as number);
    expect(tyUp).toBeCloseTo(tyDown);
  });

  it('handles extreme values', () => {
    expect(() => verticalAnimation(-100)).not.toThrow();
    expect(() => verticalAnimation(100)).not.toThrow();
  });
});

describe('vertical-fade animation', () => {
  it('returns identity at progress=0', () => {
    const style = verticalFadeAnimation(0);
    expect(getTransformValue(style, 'translateY')).toBe(0);
    expect(style.opacity).toBe(1);
  });

  it('has translation and opacity at progress=1', () => {
    const style = verticalFadeAnimation(1);
    expect(getTransformValue(style, 'translateY')).toBeGreaterThan(0);
    expect(style.opacity).toBeLessThan(1);
  });

  it('handles extreme values', () => {
    expect(() => verticalFadeAnimation(-100)).not.toThrow();
    expect(() => verticalFadeAnimation(100)).not.toThrow();
  });
});

describe('parallax animation', () => {
  it('returns identity at progress=0', () => {
    const style = parallaxAnimation(0);
    expect(getTransformValue(style, 'translateX')).toBe(0);
    expect(style.opacity).toBe(1);
  });

  it('moves less than full distance (parallax factor)', () => {
    const style = parallaxAnimation(1);
    const tx = Math.abs(getTransformValue(style, 'translateX') as number);
    expect(tx).toBeLessThan(PARALLAX_DEFAULTS.distance);
    expect(tx).toBeCloseTo(
      PARALLAX_DEFAULTS.distance * PARALLAX_DEFAULTS.parallaxFactor
    );
  });

  it('is symmetric', () => {
    const left = parallaxAnimation(-0.5);
    const right = parallaxAnimation(0.5);
    const txLeft = Math.abs(getTransformValue(left, 'translateX') as number);
    const txRight = Math.abs(getTransformValue(right, 'translateX') as number);
    expect(txLeft).toBeCloseTo(txRight);
  });

  it('handles extreme values', () => {
    expect(() => parallaxAnimation(-100)).not.toThrow();
    expect(() => parallaxAnimation(100)).not.toThrow();
  });
});

describe('overlap animation', () => {
  it('returns identity at progress=0', () => {
    const style = overlapAnimation(0);
    expect(getTransformValue(style, 'translateX')).toBe(0);
    expect(getTransformValue(style, 'scale')).toBe(1);
  });

  it('has zIndex highest at active item', () => {
    const active = overlapAnimation(0);
    const neighbor = overlapAnimation(1);
    expect(active.zIndex).toBeGreaterThan(neighbor.zIndex!);
  });

  it('translates at reduced distance (overlap)', () => {
    const style = overlapAnimation(1);
    const tx = Math.abs(getTransformValue(style, 'translateX') as number);
    expect(tx).toBeLessThan(OVERLAP_DEFAULTS.itemWidth);
    expect(tx).toBeCloseTo(
      OVERLAP_DEFAULTS.itemWidth * OVERLAP_DEFAULTS.overlapRatio
    );
  });

  it('handles extreme values', () => {
    expect(() => overlapAnimation(-100)).not.toThrow();
    expect(() => overlapAnimation(100)).not.toThrow();
  });
});

describe('peek animation', () => {
  it('returns identity at progress=0', () => {
    const style = peekAnimation(0);
    expect(getTransformValue(style, 'translateX')).toBe(0);
    expect(getTransformValue(style, 'scale')).toBe(1);
    expect(style.opacity).toBe(1);
  });

  it('scales down and fades peeking items', () => {
    const style = peekAnimation(1);
    expect(getTransformValue(style, 'scale')).toBeLessThan(1);
    expect(style.opacity).toBeLessThan(1);
  });

  it('is symmetric', () => {
    const left = peekAnimation(-0.5);
    const right = peekAnimation(0.5);
    const scaleLeft = getTransformValue(left, 'scale') as number;
    const scaleRight = getTransformValue(right, 'scale') as number;
    expect(scaleLeft).toBeCloseTo(scaleRight);
    expect(left.opacity).toBeCloseTo(right.opacity!);
  });

  it('handles extreme values', () => {
    expect(() => peekAnimation(-100)).not.toThrow();
    expect(() => peekAnimation(100)).not.toThrow();
  });
});
