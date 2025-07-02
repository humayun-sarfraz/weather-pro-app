import { useEffect } from 'react';

export default function useSpeech(onResult) {
  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SR();
    recog.onresult = e => onResult(e.results[0][0].transcript);
    recognizer.onerror = console.error;
    recog.start();
    return () => recog.stop();
  }, [onResult]);
}
