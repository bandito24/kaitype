import {useEffect, useState} from 'react'
import axiosClient from '@/services/axios-client.tsx'
import TimeFormatter from '@/components/utilities/TimeFormatter.tsx'
import {PreviousCompetitorType} from '@/lib/types.tsx'
import PreviousCompetitor from '@/components/challenge/PreviousCompetitor.tsx'
import {Button} from '@/components/ui/button.tsx'
import {Link} from 'react-router-dom'

type Props = {
  timer: number
  userId: number
  challengeId: number
  score: number
}
type ChallengeCompleteResponse = {
  loggedIn: boolean
  timeDifference: number
  meritDifference: number
  currentRanking: number
  merit: number
  updatedSubmissions: PreviousCompetitorType[]
  previousScores: {merit: number; milliseconds: number}
}

export default function ChallengeCompletedResults({
  timer,
  userId,
  challengeId,
  score,
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
          merit: score,
        })
        const {data} = response
        setChallengeResults((prevResults) => {
          if (!prevResults) {
            return data
          }
          return prevResults
        })
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    }
    postResult()
  }, [])

  const timeTool = new TimeFormatter()
  function getValueWithSuffix(number) {
    const lastDigit = number % 10
    const lastTwoDigits = number % 100

    // Check for exceptions in the last two digits
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return 'th'
    }
    switch (lastDigit) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
      default:
        return number + 'th'
    }
  }

  return (
    challengeResults && (
      <div className="absolute inset-0 z-50 mx-auto my-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
        <div className="mb-4 flex flex-col items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Nice job! You finished with {challengeResults.merit} merit.
          </h5>
          {challengeResults.previousScores && (
            <h4 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              {challengeResults.meritDifference > 0
                ? `That's ${challengeResults.meritDifference} more merit than last time. Bravo!`
                : `That's ${challengeResults.meritDifference < 0 ? Math.abs(challengeResults.meritDifference) + ' less merit than ' : ' the same merit as '} your best. ${
                    challengeResults.meritDifference === 0 &&
                    challengeResults.timeDifference < 0
                      ? `But you were faster by ${timeTool.stringifyMilliseconds(Math.abs(challengeResults.timeDifference / 10))}.`
                      : `We'll save your best result of ${challengeResults.merit}.`
                  }`}
              <br />
            </h4>
          )}
          <h4>
            This gives you the current ranking of{' '}
            {getValueWithSuffix(challengeResults.currentRanking)} place.
          </h4>
          <h6>Finishing Time: {timeTool.stringifyMilliseconds(timer)}</h6>
          {challengeResults.previousScores && (
            <h6>
              Previous Time:{' '}
              {timeTool.stringifyMilliseconds(
                challengeResults.previousScores.milliseconds / 10
              )}
            </h6>
          )}
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700">
            {challengeResults.updatedSubmissions.map((competitor, index) => (
              <PreviousCompetitor
                key={index}
                competitor={{
                  competitorId: competitor.user_id,
                  formattedTime: competitor.formatted_time,
                  username: competitor.username,
                  currentPosition: index + 1,
                  merit: competitor.merit,
                }}
                userId={userId}
              />
            ))}
          </ul>
        </div>
        <div className="mt-5 flex justify-start">
          <Link to="/submit">
            <Button className="mr-10">Continue</Button>
          </Link>
          <Link to="/submit">
            <Button>Try Again</Button>
          </Link>
        </div>
      </div>
    )
  )
}
