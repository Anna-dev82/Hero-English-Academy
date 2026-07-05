import { motion } from 'framer-motion'
import { useSpeech } from '@/hooks/useSpeech'

interface ListenButtonProps {
  text: string
  label?: string
}

export function ListenButton({ text, label = '🔊 Listen Again' }: ListenButtonProps) {
  const { speak, isSpeaking } = useSpeech()

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={() => speak(text)}
      disabled={isSpeaking}
      className="inline-flex items-center gap-2 rounded-xl bg-amber-400/20 px-4 py-2 text-sm font-semibold text-amber-200 ring-1 ring-amber-400/40 transition hover:bg-amber-400/30 disabled:opacity-60"
    >
      {label}
    </motion.button>
  )
}
