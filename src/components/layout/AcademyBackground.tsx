import { motion } from 'framer-motion'

export function AcademyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/40 via-violet-800/30 to-indigo-950/90" />

      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-8 top-16 h-20 w-32 rounded-full bg-white/10 blur-sm"
      />
      <motion.div
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-4 top-28 h-14 w-24 rounded-full bg-white/8 blur-sm"
      />
      <motion.div
        animate={{ x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/4 top-8 h-10 w-20 rounded-full bg-white/6 blur-sm"
      />

      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-yellow-200/60"
          style={{
            left: `${8 + (i * 7.5) % 90}%`,
            top: `${5 + (i * 11) % 70}%`,
            fontSize: `${10 + (i % 3) * 4}px`,
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
        >
          ✦
        </motion.span>
      ))}

      <motion.span
        className="absolute right-8 top-20 text-2xl"
        animate={{ opacity: [0.4, 1, 0.4], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⚡
      </motion.span>
      <motion.span
        className="absolute left-6 top-40 text-xl"
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        ⚡
      </motion.span>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-950 to-transparent" />

      <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-6 opacity-25">
        <div className="h-24 w-16 rounded-t-2xl bg-gradient-to-b from-violet-400 to-indigo-700" />
        <div className="h-32 w-20 rounded-t-3xl bg-gradient-to-b from-yellow-300/80 to-indigo-600" />
        <div className="h-20 w-14 rounded-t-2xl bg-gradient-to-b from-violet-400 to-indigo-700" />
      </div>
    </div>
  )
}
