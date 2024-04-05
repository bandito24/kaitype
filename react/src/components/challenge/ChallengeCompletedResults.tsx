import {useEffect, useState} from 'react'
import axiosClient from '@/services/axios-client.tsx'
import TimeFormatter from '@/components/utilities/TimeFormatter.tsx'
import {PreviousCompetitorType} from '@/lib/types.tsx'

type Props = {
  timer: number
  userId: number
  challengeId: number
}
type ChallengeCompleteResponse = {
  loggedIn: boolean
  timeDifference: number
  currentRanking: number
  updatedSubmissions: PreviousCompetitorType[]
}

export default function ChallengeCompletedResults({
  timer,
  userId,
  challengeId,
}: Props) {
  const [challengeResults, setChallengeResults] =
    useState<ChallengeCompleteResponse | null>(null)
  useEffect(() => {
    async function postResult() {
      console.log('this time: ', timer * 10)
      try {
        const response = await axiosClient.post(`/completedChallenge`, {
          user_id: userId,
          submission_id: challengeId,
          milliseconds: timer * 10,
        })
        const {data} = response
        setChallengeResults(data)
        console.log(
          'last time result: ',
          data.updatedSubmissions[0].milliseconds
        )
        console.log('time difference: ', data.timeDifference)
      } catch (e) {
        console.error(e)
      }
    }
    postResult()
  }, [])

  const timeTool = new TimeFormatter()

  return (
    challengeResults && (
      <div className="absolute inset-0 z-50 mx-auto my-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <div className="mb-4 flex flex-col items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Nice job! You finished with the time of{' '}
            {timeTool.stringifyMilliseconds(timer)}
          </h5>
          {challengeResults.timeDifference && (
            <h6 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {challengeResults.timeDifference > 0
                ? `You were ${timeTool.stringifyMilliseconds(challengeResults.timeDifference / 10)} slower than last time. We'll keep your previous fastest time`
                : `You were ${timeTool.stringifyMilliseconds(Math.abs(challengeResults.timeDifference / 10))} faster than last time! Bravo.`}
            </h6>
          )}
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700">
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
                    Neil Sims
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $320
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/test_avatar1.jpeg"
                    alt="Bonnie image"
                  />
                </div>
                <div className="ms-4 min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Bonnie Green
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $3467
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/test_avatar1.jpeg"
                    alt="Michael image"
                  />
                </div>
                <div className="ms-4 min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Michael Gough
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $67
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/test_avatar1.jpeg"
                    alt="Lana image"
                  />
                </div>
                <div className="ms-4 min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Lana Byrd
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $367
                </div>
              </div>
            </li>
            <li className="pb-0 pt-3 sm:pt-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/test_avatar1.jpeg"
                    alt="Thomas image"
                  />
                </div>
                <div className="ms-4 min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    Thomes Lean
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  $2367
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  )
}
