import React, {useEffect, useState} from 'react'
import {useChallengeContext} from '@/components/challenge/ChallengeContext.tsx'

export default function ProgressBar() {
  const {challenge} = useChallengeContext()
  const challengeProgress = React.useMemo(
    () => challenge?.challengeProgress,
    [challenge?.challengeProgress]
  )
  const [progressValue, setProgressValue] = useState<number>(0)

  useEffect(() => {
    const progress = !challenge.completed ? Math.round((
        challengeProgress!.currentIndex / (challengeProgress!.totalIndex + 1)
      ) * 100) : 100
    setProgressValue(progress)
  }, [challengeProgress, challenge.completed])

  return (
    <div className="mb-24">
      <div className="flex h-14 w-96 justify-start overflow-hidden rounded-full bg-gray-400">
        <div
          style={{
            width: `${progressValue}%`,
            transition: 'width 400ms ease-in-out',
          }}
          className="z-30 rounded-full bg-blue-600">
          {'\u00A0'}
        </div>
      </div>
    </div>
  )
}
