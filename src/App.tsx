import { AnimatePresence, motion } from 'framer-motion'
import { GameProvider, useGame } from '@/context/GameContext'
import { ListenChooseMission } from '@/components/mission/ListenChooseMission'
import { MatchMission } from '@/components/mission/MatchMission'
import { MemoryMission } from '@/components/mission/MemoryMission'
import { parseMissionScreen } from '@/constants/game'
import { AcademyMapScreen } from '@/screens/AcademyMapScreen'
import { FinalBossScreen } from '@/screens/FinalBossScreen'
import { RewardsScreen } from '@/screens/RewardsScreen'
import { StartScreen } from '@/screens/StartScreen'
import { VictoryScreen } from '@/screens/VictoryScreen'
import type { MissionActivity, MissionTopicId } from '@/types/game'

function MissionRouter({ topicId, activity }: { topicId: MissionTopicId; activity: MissionActivity }) {
  if (activity === 'listen') return <ListenChooseMission topicId={topicId} />
  if (activity === 'match') return <MatchMission topicId={topicId} />
  return <MemoryMission topicId={topicId} />
}

function GameRouter() {
  const { screen } = useGame()

  const mission = parseMissionScreen(screen)
  if (mission) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-svh"
        >
          <MissionRouter topicId={mission.topicId} activity={mission.activity} />
        </motion.div>
      </AnimatePresence>
    )
  }

  const screens = {
    start: <StartScreen />,
    map: <AcademyMapScreen />,
    rewards: <RewardsScreen />,
    'final-boss': <FinalBossScreen />,
    victory: <VictoryScreen />,
  } as const

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="min-h-svh"
      >
        {screens[screen as keyof typeof screens]}
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <GameProvider>
      <GameRouter />
    </GameProvider>
  )
}

export default App
