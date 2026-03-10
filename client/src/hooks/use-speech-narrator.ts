import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type NarrationOptions = {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceURI?: string;
};

export function useSpeechNarrator() {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && !!window.speechSynthesis);
  }, []);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsSpeaking(false);
    setIsPaused(false);
  }, [isSupported]);

  const pause = useCallback(() => {
    if (!isSupported) return;
    try {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } catch {
      // ignore
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    try {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } catch {
      // ignore
    }
  }, [isSupported]);

  const speak = useCallback(
    (text: string, opts?: NarrationOptions, onEnd?: () => void) => {
      if (!isSupported) return;

      // Cancel anything already in the queue.
      window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = opts?.rate ?? 1;
      utter.pitch = opts?.pitch ?? 1;
      utter.volume = opts?.volume ?? 1;

      // Select the best available voice
      const voices = window.speechSynthesis.getVoices();
      if (opts?.voiceURI) {
        const voice = voices.find((v) => v.voiceURI === opts.voiceURI);
        if (voice) utter.voice = voice;
      } else {
        // Prefer high-quality voices in order of preference
        const preferredVoices = [
          'Samantha',           // macOS/iOS — natural female
          'Karen',              // macOS — natural Australian
          'Daniel',             // macOS — natural British male  
          'Google US English',  // Chrome — decent quality
          'Microsoft Zira',     // Windows — decent female
          'Microsoft David',    // Windows — decent male
        ];
        let bestVoice = null;
        for (const name of preferredVoices) {
          bestVoice = voices.find((v) => v.name.includes(name) && v.lang.startsWith('en'));
          if (bestVoice) break;
        }
        // Fallback: pick any English voice that's not the default robotic one
        if (!bestVoice) {
          bestVoice = voices.find((v) => v.lang.startsWith('en') && !v.name.includes('Google') && v.localService) 
            || voices.find((v) => v.lang.startsWith('en'));
        }
        if (bestVoice) utter.voice = bestVoice;
      }

      utter.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utter.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
        onEnd?.();
      };

      utter.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
      };

      utteranceRef.current = utter;
      window.speechSynthesis.speak(utter);
    },
    [isSupported]
  );

  // Clean up when unmounting.
  useEffect(() => stop, [stop]);

  const state = useMemo(
    () => ({ isSupported, isSpeaking, isPaused }),
    [isSupported, isSpeaking, isPaused]
  );

  return { ...state, speak, stop, pause, resume } as const;
}
