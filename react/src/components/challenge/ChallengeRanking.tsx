import {useEffect, useRef, useState} from 'react'
import CurrentAttemptCompetitor from '@/components/challenge/CurrentAttemptCompetitor.tsx'
import {useStateContext} from '@/contexts/contextProvider.tsx'

type RankingProps = {
  completed: boolean
  inProgress: boolean
  score: number
  currentWeightedLevel: number
  setCurrentWeightedLevel: React.Dispatch<React.SetStateAction<number>>
  allWeightedLevels: {[key: string]: number} | null
}

export default function ChallengeRanking({
  completed,
  inProgress,
  setCurrentWeightedLevel,
  currentWeightedLevel,
  allWeightedLevels,
  score,
}: RankingProps) {
  const [timer, setTimer] = useState<number>(0)
  const [nextWeightedLevelThreshold, setNextWeightedLevelThreshold] = useState<
    number | null
  >(null)
  const {user} = useStateContext()
  const scrollRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (allWeightedLevels && Object.keys(allWeightedLevels).length > 1) {
      setNextWeightedLevelThreshold(1000)
    } else {
      setNextWeightedLevelThreshold(null)
    }
  }, [user?.id])

  useEffect(() => {
    if (inProgress && !completed) {
      const intervalId = setInterval(() => {
        setTimer((currentTimer) => currentTimer + 1)
      }, 10)
      return () => clearInterval(intervalId)
    }
  }, [inProgress, completed])

  useEffect(() => {
    if (nextWeightedLevelThreshold && timer > nextWeightedLevelThreshold) {
      setCurrentWeightedLevel((prev) => prev + 1)
      setNextWeightedLevelThreshold(() => {
        if (allWeightedLevels && allWeightedLevels[currentWeightedLevel + 1]) {
          return (currentWeightedLevel + 1) * 1000
        } else {
          return null
        }
      })
    }
  }, [timer])

  return (
    <div className="w-1/4 rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Previous Competitors
        </h5>
      </div>
      <div className="flow-root">
        <ul
          ref={scrollRef}
          role="list"
          className="no-scrollbar h-[800px] divide-y divide-gray-200 overflow-y-scroll dark:divide-gray-700">
          <CurrentAttemptCompetitor
            key={1}
            completed={completed}
            inProgress={inProgress}
            timer={timer}
            score={score}
          />
        </ul>
      </div>
    </div>
  )
}
