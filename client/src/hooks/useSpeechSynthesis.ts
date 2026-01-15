import { useCallback, useEffect, useState } from 'react';

interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

// RAPPER AD-LIBS - SOULJA BOY STYLE
const INTRO_ADLIBS = [
  'YO! ',
  'AYE! ',
  'YEAH! ',
  'SHEESH! ',
  'LETS GO! ',
  'AYYYY! ',
  'YUH! ',
  'OKAY! ',
];

const OUTRO_ADLIBS = [
  ', YOUUUU!',
  ', YA HEARD!',
  ', SWAG!',
  ', THATS FIRE!',
  ', SHEESH!',
  ', GANG GANG!',
  ', NO CAP!',
  ', STRAIGHT UP!',
];

function getRandomAdlib(adlibs: string[]): string {
  return adlibs[Math.floor(Math.random() * adlibs.length)];
}

export function useSpeechSynthesis() {
  const [deepVoice, setDeepVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Find a deep male voice when voices load
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find a deep male voice - prefer ones with "male" or deeper sounding names
      const preferredVoices = voices.filter(v =>
        v.lang.startsWith('en') && (
          v.name.toLowerCase().includes('male') ||
          v.name.toLowerCase().includes('daniel') ||
          v.name.toLowerCase().includes('alex') ||
          v.name.toLowerCase().includes('fred') ||
          v.name.toLowerCase().includes('tom') ||
          v.name.toLowerCase().includes('james')
        )
      );

      if (preferredVoices.length > 0) {
        setDeepVoice(preferredVoices[0]);
      } else {
        // Fallback to any English voice
        const englishVoice = voices.find(v => v.lang.startsWith('en'));
        if (englishVoice) setDeepVoice(englishVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((text: string, options?: SpeakOptions) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Add rapper flavor to the text
    const intro = getRandomAdlib(INTRO_ADLIBS);
    const outro = getRandomAdlib(OUTRO_ADLIBS);
    const rapperText = `${intro}${text.toUpperCase()}${outro}`;

    const utterance = new SpeechSynthesisUtterance(rapperText);

    // RAPPER VOICE SETTINGS - deep and slow with swagger
    utterance.rate = options?.rate ?? 0.75; // Slower, more swagger
    utterance.pitch = options?.pitch ?? 0.7; // DEEP voice
    utterance.volume = options?.volume ?? 1;
    utterance.lang = 'en-US';

    // Use the deep voice if we found one
    if (deepVoice) {
      utterance.voice = deepVoice;
    }

    window.speechSynthesis.speak(utterance);
  }, [deepVoice]);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, stop };
}
