import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ai.myhandyman.app',
  appName: 'MyHandyman',
  webDir: 'dist/public',
  server: {
    // In production, the app loads from the bundled files.
    // For development, uncomment the url below and point to your dev server:
    // url: 'http://YOUR_LOCAL_IP:5000',
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#1F4E79',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: '#1F4E79',
      style: 'LIGHT', // light text on dark background
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
