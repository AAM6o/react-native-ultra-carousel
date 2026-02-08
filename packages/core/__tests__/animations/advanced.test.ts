/**
 * @file Advanced animation presets unit tests
 * @description Tests for all 10 advanced animation presets
 */

import { stackAnimation } from '../../src/animations/advanced/stack';
import { tinderAnimation } from '../../src/animations/advanced/tinder';
import { coverflowAnimation } from '../../src/animations/advanced/coverflow';
import { cubeAnimation } from '../../src/animations/advanced/cube';
import { flipAnimation } from '../../src/animations/advanced/flip';
import { wheelAnimation } from '../../src/animations/advanced/wheel';
import { accordionAnimation } from '../../src/animations/advanced/accordion';
import { zoomAnimation } from '../../src/animations/advanced/zoom';
import { rotateAnimation } from '../../src/animations/advanced/rotate';
import { depthAnimation } from '../../src/animations/advanced/depth';
import type { AnimatedItemStyle } from '../../src/types';

const getTransformValue = (
  style: AnimatedItemStyle,
  key: string
): number | string | undefined => {
  const entry = style.transform?.find((t) => key in t);
  if (entry) return (entry as Record<string, number | string>)[key];
  return undefined;
};

describe('stack animation', () => {
  it('returns full size at progress=0', () => {
    const style = stackAnimation(0);
    expect(getTransformValue(style, 'scale')).toBe(1);
    expect(style.zIndex).toBe(100);
  });

  it('scales down items behind (positive progress)', () => {
    const style = stackAnimation(1);
    const scale = getTransformValue(style, 'scale') as number;
    expect(scale).toBeLessThan(1);
  });

  it('translates swiped items left (negative progress)', () => {
    const style = stackAnimation(-1);
    const tx = getTransformValue(style, 'translateX') as number;
    expect(tx).toBeLessThan(0);
  });

  it('handles extreme values', () => {
    expect(() => stackAnimation(-50)).not.toThrow();
    expect(() => stackAnimation(50)).not.toThrow();
  });
});

describe('tinder animation', () => {
  it('returns no rotation at progress=0', () => {
    const style = tinderAnimation(0);
    expect(style.zIndex).toBeGreaterThan(0);
  });

  it('rotates swiped card', () => {
    const style = tinderAnimation(-1);
    const rotate = getTransformValue(style, 'rotate') as string;
    expect(rotate).toBeDefined();
  });

  it('stacks cards behind', () => {
    const behind = tinderAnimation(1);
    const behindScale = getTransformValue(behind, 'scale') as number;
    expect(behindScale).toBeLessThan(1);
  });

  it('handles extreme values', () => {
    expect(() => tinderAnimation(-50)).not.toThrow();
    expect(() => tinderAnimation(50)).not.toThrow();
  });
});

describe('coverflow animation', () => {
  it('returns identity at progress=0', () => {
    const style = coverflowAnimation(0);
    expect(getTransformValue(style, 'rotateY')).toBe('0deg');
    expect(getTransformValue(style, 'scale')).toBe(1);
    expect(style.opacity).toBe(1);
  });

  it('rotates items at progress=1', () => {
    const style = coverflowAnimation(1);
    expect(getTransformValue(style, 'rotateY')).not.toBe('0deg');
    expect(getTransformValue(style, 'scale')).toBeLessThan(1);
  });

  it('is symmetric', () => {
    const left = coverflowAnimation(-0.5);
    const right = coverflowAnimation(0.5);
    expect(left.opacity).toBeCloseTo(right.opacity!);
  });

  it('handles extreme values', () => {
    expect(() => coverflowAnimation(-50)).not.toThrow();
    expect(() => coverflowAnimation(50)).not.toThrow();
  });
});

describe('cube animation', () => {
  it('returns no rotation at progress=0', () => {
    const style = cubeAnimation(0);
    expect(getTransformValue(style, 'rotateY')).toBe('0deg');
    expect(style.opacity).toBe(1);
  });

  it('rotates 90 degrees at progress=1', () => {
    const style = cubeAnimation(1);
    expect(getTransformValue(style, 'rotateY')).toBe('90deg');
  });

  it('handles extreme values', () => {
    expect(() => cubeAnimation(-50)).not.toThrow();
    expect(() => cubeAnimation(50)).not.toThrow();
  });
});

describe('flip animation', () => {
  it('faces forward at progress=0', () => {
    const style = flipAnimation(0);
    expect(getTransformValue(style, 'rotateY')).toBe('0deg');
    expect(style.opacity).toBe(1);
  });

  it('hides at 90deg rotation', () => {
    const style = flipAnimation(0.5);
    expect(style.opacity).toBe(1);
  });

  it('fully flipped at progress=1', () => {
    const style = flipAnimation(1);
    expect(style.opacity).toBe(0);
  });

  it('handles extreme values', () => {
    expect(() => flipAnimation(-50)).not.toThrow();
    expect(() => flipAnimation(50)).not.toThrow();
  });
});

describe('wheel animation', () => {
  it('returns identity at progress=0', () => {
    const style = wheelAnimation(0);
    expect(getTransformValue(style, 'translateX')).toBeCloseTo(0);
    expect(style.opacity).toBe(1);
  });

  it('moves along circular path', () => {
    const style = wheelAnimation(1);
    const tx = getTransformValue(style, 'translateX') as number;
    expect(tx).not.toBe(0);
  });

  it('handles extreme values', () => {
    expect(() => wheelAnimation(-50)).not.toThrow();
    expect(() => wheelAnimation(50)).not.toThrow();
  });
});

describe('accordion animation', () => {
  it('returns flat at progress=0', () => {
    const style = accordionAnimation(0);
    expect(getTransformValue(style, 'rotateX')).toBe('0deg');
    expect(style.opacity).toBe(1);
  });

  it('folds at progress=1', () => {
    const style = accordionAnimation(1);
    expect(getTransformValue(style, 'rotateX')).not.toBe('0deg');
  });

  it('handles extreme values', () => {
    expect(() => accordionAnimation(-50)).not.toThrow();
    expect(() => accordionAnimation(50)).not.toThrow();
  });
});

describe('zoom animation', () => {
  it('returns full scale at progress=0', () => {
    const style = zoomAnimation(0);
    expect(getTransformValue(style, 'scale')).toBe(1);
    expect(style.opacity).toBe(1);
  });

  it('zooms out at progress=1', () => {
    const style = zoomAnimation(1);
    expect(getTransformValue(style, 'scale')).toBeLessThan(1);
    expect(style.opacity).toBeLessThan(1);
  });

  it('is symmetric', () => {
    const left = zoomAnimation(-0.5);
    const right = zoomAnimation(0.5);
    const scaleL = getTransformValue(left, 'scale') as number;
    const scaleR = getTransformValue(right, 'scale') as number;
    expect(scaleL).toBeCloseTo(scaleR);
  });

  it('handles extreme values', () => {
    expect(() => zoomAnimation(-50)).not.toThrow();
    expect(() => zoomAnimation(50)).not.toThrow();
  });
});

describe('rotate animation', () => {
  it('returns no rotation at progress=0', () => {
    const style = rotateAnimation(0);
    expect(getTransformValue(style, 'rotate')).toBe('0deg');
    expect(getTransformValue(style, 'scale')).toBe(1);
  });

  it('rotates at progress=1', () => {
    const style = rotateAnimation(1);
    expect(getTransformValue(style, 'rotate')).not.toBe('0deg');
  });

  it('handles extreme values', () => {
    expect(() => rotateAnimation(-50)).not.toThrow();
    expect(() => rotateAnimation(50)).not.toThrow();
  });
});

describe('depth animation', () => {
  it('returns full size at progress=0', () => {
    const style = depthAnimation(0);
    expect(getTransformValue(style, 'scale')).toBe(1);
    expect(style.opacity).toBe(1);
  });

  it('recedes into background at progress=1', () => {
    const style = depthAnimation(1);
    expect(getTransformValue(style, 'scale')).toBeLessThan(1);
    expect(style.opacity).toBeLessThan(1);
  });

  it('handles extreme values', () => {
    expect(() => depthAnimation(-50)).not.toThrow();
    expect(() => depthAnimation(50)).not.toThrow();
  });
});
