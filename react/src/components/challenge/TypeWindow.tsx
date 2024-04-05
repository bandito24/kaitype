import ActiveString from '@/components/challenge/ActiveString.tsx'
import ActiveTyping from '@/components/challenge/ActiveTyping.tsx'
import React, {useEffect, useMemo, useState} from 'react'
import ProgressBar from '@/components/challenge/ProgressBar.tsx'
import Keyboard from '@/components/challenge/Keyboard.tsx'

type ChallengeProgress = {
  currentIndex: number
  totalIndex: number
}
type Challenge = string[]

type ChallengeContent = {
  title: string
  description: string
  content: string //json
  id: number
  char_count: number
}

type Props = {
  challengeContent: ChallengeContent
  completed: boolean
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>
  currentWeightedLevel: number
  allWeightedLevels: {[key: string]: number}
}

export default function TypeWindow({
  challengeContent,
  completed,
  setCompleted,
  setInProgress,
  currentWeightedLevel,
  allWeightedLevels,
}: Props) {
  const [progressString, setProgressString] = useState<string>('')
  const [challenge, setChallenge] = useState<Challenge>([])
  const [challengeProgression, setChallengeProgression] =
    useState<ChallengeProgress>({
      currentIndex: -1,
      totalIndex: 0,
    })
  const [inputValue, setInputValue] = useState('')
  const [activeString, setActiveString] = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function formatChallengeContentJson(challengeJson) {
    return JSON.parse(challengeJson)
      .map((val) => val.trim())
      .filter((val) => val.length && val.substring(0, 2) !== '//')
  }
  const formatJson = useMemo(() => {
    return formatChallengeContentJson(challengeContent.content)
  }, [challenge])

  useEffect(() => {
    const activeChallenge = formatJson
    const challengeLength = activeChallenge.length
    setChallenge(activeChallenge)
    setChallengeProgression({currentIndex: 0, totalIndex: challengeLength})
    setInProgress(true)
  }, [challengeContent])

  return (
    <div className="w-5/6">
      <div className="relative m-auto mt-44 flex w-full flex-col items-center">
        {Object.keys(challenge).length > 0 && (
          <>
            <ProgressBar
              challengeProgression={challengeProgression}
              completed={completed}
              score={score}
            />
            <ActiveString progressString={progressString} />
            <ActiveTyping
              setProgressString={setProgressString}
              setChallengeProgression={setChallengeProgression}
              challenge={challenge}
              challengeProgression={challengeProgression}
              activeString={activeString}
              setActiveString={setActiveString}
              setInProgress={setInProgress}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setCompleted={setCompleted}
              completed={completed}
              setScore={setScore}
              currentWeightedLevel={currentWeightedLevel}
              allWeightedLevels={allWeightedLevels}
            />
          </>
        )}
      </div>
      <Keyboard
        activeString={activeString}
        inputValue={inputValue}
      />
    </div>
  )
}
