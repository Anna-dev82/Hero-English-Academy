import { motion } from 'framer-motion'

export function HeroCharacter({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const scale = size === 'lg' ? 1 : 0.7

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto"
      style={{ width: 140 * scale, height: 160 * scale }}
    >
      <div className="absolute inset-x-0 bottom-0 h-4 rounded-full bg-black/30 blur-md" />
      <div
        className="relative mx-auto flex flex-col items-center"
        style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      >
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-amber-200 shadow-inner" />
          <div className="absolute -top-6 left-1/2 h-8 w-20 -translate-x-1/2 rounded-t-full bg-indigo-600" />
          <div className="absolute -top-3 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-yellow-400" />
          <div className="absolute top-5 left-3 h-2 w-2 rounded-full bg-indigo-900" />
          <div className="absolute top-5 right-3 h-2 w-2 rounded-full bg-indigo-900" />
          <div className="absolute top-9 left-1/2 h-2 w-4 -translate-x-1/2 rounded-full bg-rose-300" />
        </div>
        <div className="relative -mt-1 h-20 w-24 rounded-2xl bg-gradient-to-b from-indigo-500 to-violet-700">
          <div className="absolute -left-3 top-4 h-3 w-8 rotate-[-30deg] rounded-full bg-indigo-500" />
          <div className="absolute -right-3 top-4 h-3 w-8 rotate-[30deg] rounded-full bg-indigo-500" />
          <div className="absolute left-1/2 top-2 h-8 w-10 -translate-x-1/2 rounded-lg bg-yellow-400 text-center text-xs font-black leading-8 text-indigo-900">
            H
          </div>
        </div>
        <div className="mt-1 flex gap-2">
          <div className="h-10 w-5 rounded-b-lg bg-indigo-800" />
          <div className="h-10 w-5 rounded-b-lg bg-indigo-800" />
        </div>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -right-8 top-16 text-3xl"
        >
          ⚡
        </motion.div>
      </div>
    </motion.div>
  )
}
