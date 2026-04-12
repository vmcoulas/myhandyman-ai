/**
 * Storage abstraction for MyHandyman.
 * Uses Capacitor Preferences on native (survives app updates, more reliable).
 * Falls back to localStorage on web.
 */
import { isNative, isPluginAvailable } from './platform';

const useNativeStorage = isNative && isPluginAvailable('Preferences');

export async function getItem(key: string): Promise<string | null> {
  if (useNativeStorage) {
    const { Preferences } = await import('@capacitor/preferences');
    const { value } = await Preferences.get({ key });
    return value;
  }
  return localStorage.getItem(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  if (useNativeStorage) {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.set({ key, value });
    return;
  }
  localStorage.setItem(key, value);
}

export async function removeItem(key: string): Promise<void> {
  if (useNativeStorage) {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.remove({ key });
    return;
  }
  localStorage.removeItem(key);
}

/**
 * Synchronous getter — uses localStorage directly.
 * Use this only for initial render where async won't work (e.g., useState initializer).
 * On native, this still reads from localStorage as a fast cache;
 * the async version should be used for authoritative reads.
 */
export function getItemSync(key: string): string | null {
  return localStorage.getItem(key);
}

/**
 * Write to both localStorage (sync cache) and native Preferences (authoritative).
 */
export async function setItemWithCache(key: string, value: string): Promise<void> {
  localStorage.setItem(key, value);
  if (useNativeStorage) {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.set({ key, value });
  }
}
