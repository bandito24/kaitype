import {useEffect, useRef, useState} from 'react'
import PreviousCompetitor from '@/components/challenge/PreviousCompetitor.tsx'

import CurrentAttemptCompetitor from '@/components/challenge/CurrentAttemptCompetitor.tsx'
import {useStateContext} from '@/contexts/contextProvider.tsx'
import {PreviousCompetitorType} from '@/lib/types.tsx'

type RankingProps = {
  previousCompetitors: PreviousCompetitorType[]
  completed: boolean
  inProgress: boolean
  challengeId: number
  score: number
  currentWeightedLevel: number
  setCurrentWeightedLevel: React.Dispatch<React.SetStateAction<number>>
  allWeightedLevels: {[key: string]: number} | null
}

export default function ChallengeRanking({
  previousCompetitors,
  completed,
  inProgress,
  challengeId,
  setCurrentWeightedLevel,
  currentWeightedLevel,
  allWeightedLevels,
  score,
}: RankingProps) {
  const [rankPosition, setRankPosition] = useState<number>(1)
  const [timer, setTimer] = useState<number>(0)
  const [currentResultOrdering, setCurrentResultOrdering] = useState<
    null | PreviousCompetitorType[]
  >(null)
  const [originalResultOrdering, setOriginalResultOrdering] = useState<
    null | PreviousCompetitorType[]
  >(null)
  const [userId, setUserId] = useState<number>(-1)
  const [nextWeightedLevelThreshold, setNextWeightedLevelThreshold] = useState<
    number | null
  >(null)
  const {user} = useStateContext()
  const scrollRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (user?.id) {
      setUserId(user.id)
    }
    const orderedResults = previousCompetitors.map((obj, index) => ({
      ...obj,
      currentPosition: index + 1,
    }))
    setCurrentResultOrdering(orderedResults)
    setOriginalResultOrdering(orderedResults)
    if (allWeightedLevels && Object.keys(allWeightedLevels).length > 1) {
      setNextWeightedLevelThreshold(1000)
    } else {
      setNextWeightedLevelThreshold(null)
    }
    const scrollToBottom = () => {
      if (scrollRef && scrollRef.current) {
        const scroll = scrollRef.current
        const scrollHeight = scroll.scrollHeight
        scroll.scrollTo({
          top: scrollHeight,
          behavior: 'smooth',
        })
      }
    }
    scrollToBottom()
  }, [previousCompetitors, user?.id])

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

    let currentPosition = previousCompetitors.findIndex(
      (previousResult) => score > previousResult.merit
    )
    if (currentPosition === -1) {
      currentPosition = previousCompetitors.length
    }

    if (rankPosition !== currentPosition) {
      setRankPosition(currentPosition)

      if (originalResultOrdering) {
        const trimmedOrdering = originalResultOrdering.slice(0, currentPosition)
        setCurrentResultOrdering(trimmedOrdering)
      }
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
          {currentResultOrdering &&
            currentResultOrdering.map((competitor, index) => (
              <PreviousCompetitor
                key={index}
                competitor={{
                  competitorId: competitor.user_id,
                  formattedTime: competitor.formatted_time,
                  username: competitor.username,
                  currentPosition: competitor?.currentPosition,
                  merit: competitor.merit,
                }}
                userId={userId}
              />
            ))}
          <CurrentAttemptCompetitor
            key={1}
            rankPosition={rankPosition}
            completed={completed}
            inProgress={inProgress}
            timer={timer}
            setTimer={setTimer}
            challengeId={challengeId}
            userId={userId}
            score={score}
          />
        </ul>
      </div>
    </div>
  )
}
