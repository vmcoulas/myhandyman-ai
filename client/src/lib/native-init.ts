/**
 * Native app initialization.
 * Sets up status bar, splash screen, back button handling, keyboard, and network listeners.
 * All calls are no-ops on web.
 */
import { isNative, isIOS, isAndroid, isPluginAvailable } from './platform';

/**
 * Initialize all native plugins. Call once from App.tsx on mount.
 */
export async function initNativeApp(): Promise<void> {
  if (!isNative) return;

  // Status bar
  if (isPluginAvailable('StatusBar')) {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: Style.Light }); // light text
    if (isAndroid) {
      await StatusBar.setBackgroundColor({ color: '#1F4E79' });
    }
  }

  // Splash screen — hide after init
  if (isPluginAvailable('SplashScreen')) {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    // Give the app a moment to render, then hide
    setTimeout(() => SplashScreen.hide(), 300);
  }

  // Android back button handling
  if (isAndroid && isPluginAvailable('App')) {
    const { App } = await import('@capacitor/app');
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }

  // Keyboard — adjust viewport on iOS
  if (isIOS && isPluginAvailable('Keyboard')) {
    const { Keyboard } = await import('@capacitor/keyboard');
    Keyboard.addListener('keyboardWillShow', () => {
      document.body.classList.add('keyboard-open');
    });
    Keyboard.addListener('keyboardWillHide', () => {
      document.body.classList.remove('keyboard-open');
    });
  }

  // Network status listener
  if (isPluginAvailable('Network')) {
    const { Network } = await import('@capacitor/network');
    Network.addListener('networkStatusChange', (status) => {
      if (!status.connected) {
        // Dispatch a custom event that components can listen for
        window.dispatchEvent(new CustomEvent('myhandyman:offline'));
      } else {
        window.dispatchEvent(new CustomEvent('myhandyman:online'));
      }
    });
  }
}

/**
 * Register for push notifications. Call after user has interacted with the app.
 */
export async function registerPushNotifications(): Promise<string | null> {
  if (!isNative || !isPluginAvailable('PushNotifications')) return null;

  const { PushNotifications } = await import('@capacitor/push-notifications');

  const permission = await PushNotifications.requestPermissions();
  if (permission.receive !== 'granted') return null;

  await PushNotifications.register();

  return new Promise((resolve) => {
    PushNotifications.addListener('registration', (token) => {
      console.log('[push] Token:', token.value);
      resolve(token.value);
    });
    PushNotifications.addListener('registrationError', (err) => {
      console.error('[push] Registration failed:', err);
      resolve(null);
    });
  });
}
