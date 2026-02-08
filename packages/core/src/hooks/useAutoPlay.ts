/**
 * @file useAutoPlay hook
 * @description Manages automatic slide advancement with pause/resume controls
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AutoPlayConfig } from '../types';
import { DEFAULT_AUTO_PLAY_INTERVAL } from '../utils/constants';

/** Return type of the useAutoPlay hook */
export interface UseAutoPlayReturn {
  /** Whether auto play is currently running */
  isPlaying: boolean;
  /** Start auto play */
  start: () => void;
  /** Stop auto play permanently until start is called */
  stop: () => void;
  /** Pause temporarily (e.g., during user interaction) */
  pause: () => void;
  /** Resume after a pause */
  resume: () => void;
  /** Notify the hook that user interacted (resets pause timer) */
  onInteraction: () => void;
}

/**
 * Manages automatic carousel advancement.
 *
 * @param config - Auto play configuration
 * @param onAdvance - Callback to advance to the next or previous item
 * @returns Auto play control methods and state
 */
export const useAutoPlay = (
  config: AutoPlayConfig | boolean | undefined,
  onAdvance: (direction: 'forward' | 'backward') => void
): UseAutoPlayReturn => {
  const normalizedConfig: AutoPlayConfig = typeof config === 'boolean'
    ? { enabled: config }
    : config ?? { enabled: false };

  const {
    enabled,
    interval = DEFAULT_AUTO_PLAY_INTERVAL,
    pauseOnInteraction = true,
    direction = 'forward',
  } = normalizedConfig;

  const [isPlaying, setIsPlaying] = useState(enabled);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        onAdvance(direction);
      }
    }, interval);
  }, [clearTimer, interval, direction, onAdvance]);

  const start = useCallback(() => {
    setIsPlaying(true);
    isPausedRef.current = false;
    startTimer();
  }, [startTimer]);

  const stop = useCallback(() => {
    setIsPlaying(false);
    isPausedRef.current = false;
    clearTimer();
  }, [clearTimer]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const onInteraction = useCallback(() => {
    if (pauseOnInteraction && isPlaying) {
      pause();
      setTimeout(() => {
        resume();
      }, interval);
    }
  }, [pauseOnInteraction, isPlaying, pause, resume, interval]);

  useEffect(() => {
    if (enabled) {
      start();
    } else {
      stop();
    }

    return clearTimer;
  }, [enabled, start, stop, clearTimer]);

  return {
    isPlaying,
    start,
    stop,
    pause,
    resume,
    onInteraction,
  };
};
