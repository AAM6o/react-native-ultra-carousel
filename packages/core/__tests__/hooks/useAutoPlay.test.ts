/**
 * @file useAutoPlay hook unit tests
 * @description Tests for auto play lifecycle, timing, and interaction handling
 */

import { renderHook, act } from '@testing-library/react-native';
import { useAutoPlay } from '../../src/hooks/useAutoPlay';

describe('useAutoPlay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const mockOnAdvance = jest.fn();

  it('starts playing when enabled is true', () => {
    const { result } = renderHook(() =>
      useAutoPlay({ enabled: true, interval: 1000 }, mockOnAdvance)
    );

    expect(result.current.isPlaying).toBe(true);
  });

  it('does not play when enabled is false', () => {
    const { result } = renderHook(() =>
      useAutoPlay({ enabled: false }, mockOnAdvance)
    );

    expect(result.current.isPlaying).toBe(false);
  });

  it('calls onAdvance at the specified interval', () => {
    renderHook(() =>
      useAutoPlay({ enabled: true, interval: 1000 }, mockOnAdvance)
    );

    expect(mockOnAdvance).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockOnAdvance).toHaveBeenCalledTimes(1);
    expect(mockOnAdvance).toHaveBeenCalledWith('forward');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockOnAdvance).toHaveBeenCalledTimes(2);
  });

  it('advances backward when direction is backward', () => {
    renderHook(() =>
      useAutoPlay(
        { enabled: true, interval: 1000, direction: 'backward' },
        mockOnAdvance
      )
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockOnAdvance).toHaveBeenCalledWith('backward');
  });

  it('stops when stop is called', () => {
    const { result } = renderHook(() =>
      useAutoPlay({ enabled: true, interval: 1000 }, mockOnAdvance)
    );

    act(() => {
      result.current.stop();
    });

    expect(result.current.isPlaying).toBe(false);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockOnAdvance).not.toHaveBeenCalled();
  });

  it('resumes after start is called', () => {
    const { result } = renderHook(() =>
      useAutoPlay({ enabled: false }, mockOnAdvance)
    );

    act(() => {
      result.current.start();
    });

    expect(result.current.isPlaying).toBe(true);
  });

  it('accepts boolean true as config shorthand', () => {
    const { result } = renderHook(() =>
      useAutoPlay(true, mockOnAdvance)
    );

    expect(result.current.isPlaying).toBe(true);
  });

  it('accepts boolean false as config shorthand', () => {
    const { result } = renderHook(() =>
      useAutoPlay(false, mockOnAdvance)
    );

    expect(result.current.isPlaying).toBe(false);
  });

  it('accepts undefined config', () => {
    const { result } = renderHook(() =>
      useAutoPlay(undefined, mockOnAdvance)
    );

    expect(result.current.isPlaying).toBe(false);
  });

  it('cleans up interval on unmount', () => {
    const { unmount } = renderHook(() =>
      useAutoPlay({ enabled: true, interval: 1000 }, mockOnAdvance)
    );

    unmount();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockOnAdvance).not.toHaveBeenCalled();
  });
});
