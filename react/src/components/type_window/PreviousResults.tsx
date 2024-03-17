import {useEffect, useState} from 'react'
import PreviousCompetitor from '@/components/type_window/PreviousCompetitor.tsx'
import TimeFormatter from '@/components/utilities/TimeFormatter.tsx'

type Props = {
  previousResults: PreviousResult[]
  timer: number
}

type PreviousResult = {
  user_id: number
  formatted_time: string
  milliseconds: number
  username: string
  currentPosition?: number
}

export default function PreviousResults({previousResults, timer}: Props) {
  const [rankPosition, setRankPosition] = useState<number>(1)
  const [currentResultOrdering, setCurrentResultOrdering] = useState<
    null | PreviousResult[]
  >(null)
  const timeTool = new TimeFormatter()

  useEffect(() => {
    setCurrentResultOrdering(() => {
      return previousResults.map((obj, index) => ({
        ...obj,
        currentPosition: index + 2,
      }))
    })
  }, [previousResults])

  useEffect(() => {
    let currentPosition = previousResults.findIndex(
      (previousResult) => previousResult.milliseconds > timer * 10
    )
    currentPosition++
    if (rankPosition !== currentPosition) {
      setRankPosition(currentPosition)
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
          <PreviousCompetitor
            key={99}
            competitor={{
              formattedTime: timeTool.formatMilliseconds(timer),
              username: 'CURRENT',
              currentPosition: rankPosition,
            }}
          />
          {currentResultOrdering &&
            currentResultOrdering.map((competitor, index) => (
              <PreviousCompetitor
                key={index}
                competitor={{
                  formattedTime: competitor.formatted_time,
                  username: competitor.username,
                  currentPosition: competitor.currentPosition,
                }}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}
