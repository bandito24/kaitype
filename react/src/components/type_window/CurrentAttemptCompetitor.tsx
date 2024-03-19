import {useEffect, useState} from 'react'
import TimeFormatter from '@/components/utilities/TimeFormatter.tsx'

type Props = {
  completed: boolean
  inProgress: boolean
  timer: number
  setTimer: React.Dispatch<React.SetStateAction<number>>
  rankPosition: number
}

export default function CurrentAttemptCompetitor({
  completed,
  inProgress,
  timer,
  setTimer,
  rankPosition,
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
    <>
      <li className="py-3 sm:py-4">
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
            {/*<p className="truncate text-sm text-gray-500 dark:text-gray-400">*/}
            {/*  email@windster.com*/}
            {/*</p>*/}
          </div>
          <div className="box-content inline-flex w-[80px] items-center text-base font-semibold text-gray-700 dark:text-white">
            {timeTool.formatMilliseconds(timer)}
          </div>
        </div>
      </li>
    </>
  )
}
