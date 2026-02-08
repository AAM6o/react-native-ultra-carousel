/**
 * @file AutoPlayController component
 * @description Headless component that manages auto play lifecycle
 */

import { useEffect } from 'react';
import type { AutoPlayConfig } from '../types';
import { useAutoPlay, type UseAutoPlayReturn } from '../hooks/useAutoPlay';

/** Props for the AutoPlayController */
export interface AutoPlayControllerProps {
  /** Auto play configuration */
  config: AutoPlayConfig | boolean | undefined;
  /** Callback to advance carousel */
  onAdvance: (direction: 'forward' | 'backward') => void;
  /** Callback to expose auto play controls to parent */
  onControlsReady?: (controls: UseAutoPlayReturn) => void;
}

/**
 * Headless component that manages carousel auto play.
 * Renders nothing — all logic is in hooks.
 */
export const AutoPlayController: React.FC<AutoPlayControllerProps> = ({
  config,
  onAdvance,
  onControlsReady,
}) => {
  const controls = useAutoPlay(config, onAdvance);

  useEffect(() => {
    onControlsReady?.(controls);
  }, [controls, onControlsReady]);

  return null;
};

AutoPlayController.displayName = 'AutoPlayController';
