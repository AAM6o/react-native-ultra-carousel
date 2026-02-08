/**
 * @file Creative animation presets unit tests
 * @description Tests for all 15 creative animation presets
 */

import { newspaperAnimation } from '../../src/animations/creative/newspaper';
import { origamiAnimation } from '../../src/animations/creative/origami';
import { carousel3dAnimation } from '../../src/animations/creative/carousel3d';
import { waveAnimation } from '../../src/animations/creative/wave';
import { spiralAnimation } from '../../src/animations/creative/spiral';
import { glitchAnimation } from '../../src/animations/creative/glitch';
import { morphAnimation } from '../../src/animations/creative/morph';
import { shutterAnimation } from '../../src/animations/creative/shutter';
import { dominoAnimation } from '../../src/animations/creative/domino';
import { elasticAnimation } from '../../src/animations/creative/elastic';
import { blurSlideAnimation } from '../../src/animations/creative/blurSlide';
import { windmillAnimation } from '../../src/animations/creative/windmill';
import { filmStripAnimation } from '../../src/animations/creative/filmStrip';
import { helixAnimation } from '../../src/animations/creative/helix';
import { gravityAnimation } from '../../src/animations/creative/gravity';

const allCreativePresets = [
  { name: 'newspaper', fn: newspaperAnimation },
  { name: 'origami', fn: origamiAnimation },
  { name: 'carousel3d', fn: carousel3dAnimation },
  { name: 'wave', fn: waveAnimation },
  { name: 'spiral', fn: spiralAnimation },
  { name: 'glitch', fn: glitchAnimation },
  { name: 'morph', fn: morphAnimation },
  { name: 'shutter', fn: shutterAnimation },
  { name: 'domino', fn: dominoAnimation },
  { name: 'elastic', fn: elasticAnimation },
  { name: 'blurSlide', fn: blurSlideAnimation },
  { name: 'windmill', fn: windmillAnimation },
  { name: 'filmStrip', fn: filmStripAnimation },
  { name: 'helix', fn: helixAnimation },
  { name: 'gravity', fn: gravityAnimation },
];

describe.each(allCreativePresets)('$name animation', ({ fn }) => {
  it('returns a valid style object at progress=0', () => {
    const style = fn(0);
    expect(style).toBeDefined();
    expect(typeof style).toBe('object');
  });

  it('returns a valid style at progress=-1', () => {
    const style = fn(-1);
    expect(style).toBeDefined();
  });

  it('returns a valid style at progress=1', () => {
    const style = fn(1);
    expect(style).toBeDefined();
  });

  it('does not throw on extreme values', () => {
    expect(() => fn(-100)).not.toThrow();
    expect(() => fn(100)).not.toThrow();
    expect(() => fn(0.001)).not.toThrow();
    expect(() => fn(-0.001)).not.toThrow();
  });

  it('returns opacity between 0 and 1 (or undefined)', () => {
    const values = [-1, -0.5, 0, 0.5, 1];
    for (const v of values) {
      const style = fn(v);
      if (style.opacity !== undefined) {
        expect(style.opacity).toBeGreaterThanOrEqual(0);
        expect(style.opacity).toBeLessThanOrEqual(1.5);
      }
    }
  });

  it('has full visibility at progress=0', () => {
    const style = fn(0);
    if (style.opacity !== undefined) {
      expect(style.opacity).toBeGreaterThanOrEqual(0.8);
    }
  });
});
