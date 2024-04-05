import {useEffect, useState} from 'react'

type ChallengeProgress = {
  currentIndex: number
  totalIndex: number
}

type Props = {
  challengeProgression: ChallengeProgress
  completed: boolean
  score: number
}

export default function ProgressBar({
  challengeProgression,
  completed,
  score,
}: Props) {
  const [progressValue, setProgressValue] = useState<number>(0)

  useEffect(() => {
    setProgressValue(
      completed
        ? 100
        : (challengeProgression.currentIndex /
            challengeProgression.totalIndex) *
            100
    )
  }, [challengeProgression, completed])

  return (
    <div className="mb-24">
      <p>Score currently is: {score}</p>
      <div className="flex h-14 w-96 justify-start overflow-hidden rounded-full bg-gray-400">
        <div
          style={{
            width: `${progressValue}%`,
            transition: 'width 400ms ease-in-out',
          }}
          className="z-50 rounded-full bg-blue-600">
          {'\u00A0'}
        </div>
      </div>
    </div>
  )
}
