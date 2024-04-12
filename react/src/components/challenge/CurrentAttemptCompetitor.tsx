import React, {useEffect} from 'react'
import TimeFormatter from '@/components/utilities/TimeFormatter.tsx'
import ChallengeCompletedResults from '@/components/challenge/ChallengeCompletedResults.tsx'

type Props = {
  completed: boolean
  inProgress: boolean
  timer: number
  setTimer: React.Dispatch<React.SetStateAction<number>>
  rankPosition: number
  userId: number
  challengeId: number
  score: number
}

export default function CurrentAttemptCompetitor({
  completed,
  inProgress,
  timer,
  setTimer,
  rankPosition,
  userId,
  score,
  challengeId,
}: Props) {
  useEffect(() => {
    if (inProgress && !completed) {
      const intervalId = setInterval(() => {
        setTimer((currentTimer) => currentTimer + 1)
      }, 10)
      return () => clearInterval(intervalId)
    }
  }, [inProgress, completed])

  const timeTool = new TimeFormatter()

  return (
    <div className="bg-green-200 pl-4">
      <li className="box-border py-3 sm:py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src="/test_avatar1.jpeg"
              alt="Neil image"
            />
          </div>
          <div className="ms-4 min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {rankPosition + 1}. {'CURRENT'}
            </p>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
              {timeTool.formatMilliseconds(timer)}
            </p>
          </div>
          <div className="box-content inline-flex w-[80px] items-center text-base font-semibold text-gray-700 dark:text-white">
            {score}
          </div>
        </div>
      </li>
      {completed && (
        <ChallengeCompletedResults
          timer={timer}
          userId={userId}
          challengeId={challengeId}
        />
      )}
    </div>
  )
}
