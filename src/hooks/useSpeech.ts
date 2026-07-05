import { useCallback, useEffect, useState } from 'react'
import { preloadVoices, speakEnglish, stopSpeaking } from '@/utils/speech'

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    preloadVoices()
    return () => stopSpeaking()
  }, [])

  const speak = useCallback((text: string) => {
    setIsSpeaking(true)
    speakEnglish(text)

    const checkEnd = () => {
      if (!window.speechSynthesis.speaking) {
        setIsSpeaking(false)
      } else {
        requestAnimationFrame(checkEnd)
      }
    }
    requestAnimationFrame(checkEnd)
  }, [])

  return { speak, isSpeaking, stop: stopSpeaking }
}
