/**
 * @file useCarousel hook unit tests
 * @description Tests for the external carousel control hook
 */

import { renderHook, act } from '@testing-library/react-native';
import { useCarousel } from '../../src/hooks/useCarousel';

describe('useCarousel', () => {
  it('returns the expected interface', () => {
    const { result } = renderHook(() => useCarousel());

    expect(result.current.ref).toBeDefined();
    expect(typeof result.current.activeIndex).toBe('number');
    expect(typeof result.current.totalItems).toBe('number');
    expect(typeof result.current.scrollTo).toBe('function');
    expect(typeof result.current.next).toBe('function');
    expect(typeof result.current.prev).toBe('function');
    expect(typeof result.current.isAnimating).toBe('boolean');
    expect(typeof result.current.autoPlay.start).toBe('function');
    expect(typeof result.current.autoPlay.stop).toBe('function');
    expect(typeof result.current.autoPlay.pause).toBe('function');
    expect(typeof result.current.autoPlay.isPlaying).toBe('boolean');
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useCarousel());

    expect(result.current.activeIndex).toBe(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.isAnimating).toBe(false);
    expect(result.current.autoPlay.isPlaying).toBe(false);
  });

  it('updates activeIndex via _onIndexChange', () => {
    const { result } = renderHook(() => useCarousel());

    act(() => {
      result.current._onIndexChange(3);
    });

    expect(result.current.activeIndex).toBe(3);
  });

  it('updates totalItems via _setTotalItems', () => {
    const { result } = renderHook(() => useCarousel());

    act(() => {
      result.current._setTotalItems(10);
    });

    expect(result.current.totalItems).toBe(10);
  });

  it('ref is initially null', () => {
    const { result } = renderHook(() => useCarousel());

    expect(result.current.ref.current).toBeNull();
  });
});
