/**
 * Platform detection and native capability utilities for MyHandyman.
 * Detects whether the app is running in a Capacitor native shell (iOS/Android)
 * or in a standard web browser.
 */
import { Capacitor } from '@capacitor/core';

/** True when running inside a Capacitor native shell (iOS or Android). */
export const isNative = Capacitor.isNativePlatform();

/** True when running on iOS (native only). */
export const isIOS = Capacitor.getPlatform() === 'ios';

/** True when running on Android (native only). */
export const isAndroid = Capacitor.getPlatform() === 'android';

/** True when running in a standard web browser (not wrapped by Capacitor). */
export const isWeb = Capacitor.getPlatform() === 'web';

/**
 * Check if a specific Capacitor plugin is available on the current platform.
 * Useful for progressive enhancement — use native features when available,
 * fall back to web APIs when not.
 */
export function isPluginAvailable(pluginName: string): boolean {
  return Capacitor.isPluginAvailable(pluginName);
}

/**
 * Returns the current platform string: 'ios' | 'android' | 'web'
 */
export function getPlatform(): 'ios' | 'android' | 'web' {
  return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
}
