import {useEffect, useState} from 'react'

type ChallengeProgress = {
  currentIndex: number
  totalIndex: number
}

type Props = {
  inProgress: boolean
  challengeProgression: ChallengeProgress
  completed: boolean
}

export default function ProgressTimer({
  inProgress,
  challengeProgression,
  completed,
}: Props) {
  const [progressValue, setProgressValue] = useState<number>(0)

  useEffect(() => {
    console.log('numerator: ', challengeProgression.currentIndex)
    console.log('denominator: ', challengeProgression.totalIndex)
    setProgressValue(
      completed
        ? 100
        : (challengeProgression.currentIndex /
            challengeProgression.totalIndex) *
            100
    )
  }, [challengeProgression, completed])

  console.log(progressValue)

  return (
    <div className="mb-24">
      <div className="flex h-14 w-96 justify-start overflow-hidden rounded-full bg-gray-400">
        <div
          style={{
            width: `${progressValue}%`,
            transition: 'width 500ms ease-in-out',
          }}
          className="z-50 rounded-full bg-blue-600">
          {'\u00A0'}
        </div>
      </div>
    </div>
  )
}
