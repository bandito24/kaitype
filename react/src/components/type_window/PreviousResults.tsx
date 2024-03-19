import React, {useEffect, useState} from 'react'
import PreviousCompetitor from '@/components/type_window/PreviousCompetitor.tsx'
import TimeFormatter from '@/components/utilities/TimeFormatter.tsx'
import CurrentAttemptCompetitor from '@/components/type_window/CurrentAttemptCompetitor.tsx'

type Props = {
  previousResults: PreviousResult[]
  completed: boolean
  inProgress: boolean
}

type PreviousResult = {
  user_id: number
  formatted_time: string
  milliseconds: number
  username: string
  currentPosition?: number
}

export default function PreviousResults({
  previousResults,
  completed,
  inProgress,
}: Props) {
  const [rankPosition, setRankPosition] = useState<number>(1)
  const [timer, setTimer] = useState<number>(0)
  const [currentResultOrdering, setCurrentResultOrdering] = useState<
    null | PreviousResult[]
  >(null)
  const [originalResultOrdering, setOriginalResultOrdering] = useState<
    null | PreviousResult[]
  >(null)
  const timeTool = new TimeFormatter()

  useEffect(() => {
    const orderedResults = previousResults.map((obj, index) => ({
      ...obj,
      currentPosition: index + 2,
    }))
    setCurrentResultOrdering(orderedResults)
    setOriginalResultOrdering(orderedResults)
  }, [previousResults])

  useEffect(() => {
    let currentPosition = previousResults.findIndex(
      (previousResult) => previousResult.milliseconds > timer * 10
    )
    if (rankPosition !== currentPosition) {
      setRankPosition(currentPosition)

      if (originalResultOrdering && currentPosition > 0) {
        const trimmedOrdering = originalResultOrdering.slice(currentPosition)
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
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700">
          <CurrentAttemptCompetitor
            key={99}
            rankPosition={rankPosition}
            // competitor={{
            //   formattedTime: timeTool.formatMilliseconds(timer),
            //   username: 'CURRENT',
            //   currentPosition: rankPosition + 1,
            // }}
            completed={completed}
            inProgress={inProgress}
            timer={timer}
            setTimer={setTimer}
          />
          {currentResultOrdering &&
            currentResultOrdering.map((competitor, index) => (
              <PreviousCompetitor
                key={index}
                competitor={{
                  formattedTime: competitor.formatted_time,
                  username: competitor.username,
                  currentPosition: competitor?.currentPosition,
                }}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}
