import type { ReactNode } from 'react'
import { AcademyBackground } from '@/components/layout/AcademyBackground'
import { ProfileBar } from '@/components/layout/ProfileBar'

interface GameShellProps {
  children: ReactNode
  showProfile?: boolean
  className?: string
}

export function GameShell({ children, showProfile = true, className = '' }: GameShellProps) {
  return (
    <div
      className={`relative mx-auto flex min-h-svh w-full max-w-lg flex-col gap-4 overflow-hidden bg-gradient-to-b from-indigo-900 via-violet-950 to-slate-950 px-4 py-4 text-white ${className}`}
    >
      <AcademyBackground />
      <div className="relative z-10 flex flex-col gap-4">
        {showProfile && <ProfileBar />}
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}
