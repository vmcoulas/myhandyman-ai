/**
 * Unified camera/photo interface.
 * Uses Capacitor Camera on native, falls back to file input on web.
 */
import { isNative, isPluginAvailable } from './platform';

interface PhotoResult {
  file: File;
  previewUrl: string;
}

/**
 * Take a photo using the device camera.
 * On native: uses Capacitor Camera plugin with native UI.
 * On web: falls back to getUserMedia or null if unavailable.
 */
export async function takePhoto(): Promise<PhotoResult | null> {
  if (isNative && isPluginAvailable('Camera')) {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');

    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      width: 1024,
      height: 1024,
      correctOrientation: true,
    });

    if (!image.dataUrl) return null;

    // Convert data URL to File object
    const response = await fetch(image.dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
    const previewUrl = image.dataUrl;

    return { file, previewUrl };
  }

  // Web fallback: use getUserMedia
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute('playsinline', '');
        video.play();
        video.addEventListener('playing', () => {
          setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(video, 0, 0);
            canvas.toBlob((blob) => {
              stream.getTracks().forEach(track => track.stop());
              if (blob) {
                const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
                const previewUrl = URL.createObjectURL(file);
                resolve({ file, previewUrl });
              } else {
                resolve(null);
              }
            }, 'image/jpeg', 0.8);
          }, 300);
        });
      })
      .catch(() => reject(new Error('Camera access denied')));
  });
}

/**
 * Pick a photo from the device gallery.
 * On native: uses Capacitor Camera plugin photo picker.
 * On web: returns null (handled via file input).
 */
export async function pickPhoto(): Promise<PhotoResult | null> {
  if (isNative && isPluginAvailable('Camera')) {
    const { Camera, CameraResultType, CameraSource } = await import('@capacitor/camera');

    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      width: 1024,
      height: 1024,
      correctOrientation: true,
    });

    if (!image.dataUrl) return null;

    const response = await fetch(image.dataUrl);
    const blob = await response.blob();
    const file = new File([blob], 'gallery-photo.jpg', { type: 'image/jpeg' });
    const previewUrl = image.dataUrl;

    return { file, previewUrl };
  }

  // Web: return null — the file input handles this
  return null;
}

/**
 * Trigger a light haptic tap (for step changes, photo capture, etc.).
 * Silent no-op on web.
 */
export async function hapticTap(): Promise<void> {
  if (isNative && isPluginAvailable('Haptics')) {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  }
}

/**
 * Trigger a medium haptic notification (for confirmations, completions).
 * Silent no-op on web.
 */
export async function hapticNotification(): Promise<void> {
  if (isNative && isPluginAvailable('Haptics')) {
    const { Haptics, NotificationType } = await import('@capacitor/haptics');
    await Haptics.notification({ type: NotificationType.Success });
  }
}
