/**
 * @file PluginManager unit tests
 * @description Tests for plugin registration, lifecycle, and composition
 */

import { PluginManager, createPlugin } from '../../src/plugins/PluginManager';
import type { CarouselPlugin, CarouselRef } from '../../src/types';

const mockCarouselRef: CarouselRef = {
  scrollTo: jest.fn(),
  next: jest.fn(),
  prev: jest.fn(),
  getCurrentIndex: jest.fn().mockReturnValue(0),
  startAutoPlay: jest.fn(),
  stopAutoPlay: jest.fn(),
  pauseAutoPlay: jest.fn(),
};

describe('createPlugin', () => {
  it('creates a plugin with all provided options', () => {
    const onInit = jest.fn();
    const onIndexChange = jest.fn();
    const onDestroy = jest.fn();

    const plugin = createPlugin({
      name: 'test-plugin',
      onInit,
      onIndexChange,
      onDestroy,
    });

    expect(plugin.name).toBe('test-plugin');
    expect(plugin.onInit).toBe(onInit);
    expect(plugin.onIndexChange).toBe(onIndexChange);
    expect(plugin.onDestroy).toBe(onDestroy);
  });

  it('creates a minimal plugin with just a name', () => {
    const plugin = createPlugin({ name: 'minimal' });
    expect(plugin.name).toBe('minimal');
    expect(plugin.onInit).toBeUndefined();
  });
});

describe('PluginManager', () => {
  let manager: PluginManager;

  beforeEach(() => {
    manager = new PluginManager();
  });

  describe('register', () => {
    it('registers a plugin', () => {
      const plugin = createPlugin({ name: 'test' });
      manager.register(plugin);
      expect(manager.count).toBe(1);
    });

    it('prevents duplicate registration', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
      const plugin = createPlugin({ name: 'test' });
      manager.register(plugin);
      manager.register(plugin);
      expect(manager.count).toBe(1);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('already registered')
      );
      warnSpy.mockRestore();
    });
  });

  describe('unregister', () => {
    it('removes a plugin by name', () => {
      const onDestroy = jest.fn();
      const plugin = createPlugin({ name: 'test', onDestroy });
      manager.register(plugin);
      manager.unregister('test');
      expect(manager.count).toBe(0);
      expect(onDestroy).toHaveBeenCalled();
    });

    it('does nothing for non-existent plugin', () => {
      expect(() => manager.unregister('nonexistent')).not.toThrow();
    });
  });

  describe('init', () => {
    it('calls onInit on all plugins', () => {
      const onInit1 = jest.fn();
      const onInit2 = jest.fn();
      manager.register(createPlugin({ name: 'p1', onInit: onInit1 }));
      manager.register(createPlugin({ name: 'p2', onInit: onInit2 }));

      manager.init(mockCarouselRef);

      expect(onInit1).toHaveBeenCalledWith(mockCarouselRef);
      expect(onInit2).toHaveBeenCalledWith(mockCarouselRef);
    });

    it('only initializes once', () => {
      const onInit = jest.fn();
      manager.register(createPlugin({ name: 'test', onInit }));

      manager.init(mockCarouselRef);
      manager.init(mockCarouselRef);

      expect(onInit).toHaveBeenCalledTimes(1);
    });
  });

  describe('notifyIndexChange', () => {
    it('notifies all plugins of index change', () => {
      const onChange1 = jest.fn();
      const onChange2 = jest.fn();
      manager.register(createPlugin({ name: 'p1', onIndexChange: onChange1 }));
      manager.register(createPlugin({ name: 'p2', onIndexChange: onChange2 }));

      manager.notifyIndexChange(3);

      expect(onChange1).toHaveBeenCalledWith(3);
      expect(onChange2).toHaveBeenCalledWith(3);
    });
  });

  describe('destroy', () => {
    it('calls onDestroy on all plugins and clears registry', () => {
      const onDestroy1 = jest.fn();
      const onDestroy2 = jest.fn();
      manager.register(createPlugin({ name: 'p1', onDestroy: onDestroy1 }));
      manager.register(createPlugin({ name: 'p2', onDestroy: onDestroy2 }));

      manager.destroy();

      expect(onDestroy1).toHaveBeenCalled();
      expect(onDestroy2).toHaveBeenCalled();
      expect(manager.count).toBe(0);
    });
  });

  describe('constructor with initial plugins', () => {
    it('accepts initial plugins array', () => {
      const plugins: CarouselPlugin[] = [
        createPlugin({ name: 'a' }),
        createPlugin({ name: 'b' }),
      ];
      const mgr = new PluginManager(plugins);
      expect(mgr.count).toBe(2);
    });
  });
});
