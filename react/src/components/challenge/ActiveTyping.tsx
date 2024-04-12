import React, {useEffect, useState} from 'react'
import {encodeHtmlEntities} from '@/lib/helperFunctions.tsx'
import BoostMeter from '@/components/challenge/BoostMeter.tsx'
import {boostColorValues} from '@/components/utilities/boostColors.tsx'

type ChallengeProgress = {
  currentIndex: number
  totalIndex: number
}
type Challenge = {
  [key: number]: string
}

type ActiveTypingProps = {
  setProgressString: React.Dispatch<React.SetStateAction<string>>
  setChallengeProgression: React.Dispatch<
    React.SetStateAction<ChallengeProgress>
  >
  setInProgress: React.Dispatch<React.SetStateAction<boolean>>
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  setActiveString: React.Dispatch<React.SetStateAction<string>>
  setScore: React.Dispatch<React.SetStateAction<number>>
  activeString: string
  challenge: Challenge
  challengeProgression: ChallengeProgress
  inputValue: string
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
  completed: boolean
  currentWeightedLevel: number
  allWeightedLevels: {[key: string]: number} | null
}

export default function ActiveTyping({
  setProgressString,
  setChallengeProgression,
  setInProgress,
  setScore,
  challenge,
  challengeProgression,
  activeString,
  setActiveString,
  inputValue,
  setInputValue,
  setCompleted,
  completed,
  currentWeightedLevel,
  allWeightedLevels,
}: ActiveTypingProps) {
  const [initialErrorIndex, setInitialErrorIndex] = useState<number>(-1)
  const [lastKey, setLastKey] = useState<string | null>()
  const [boostProgress, setBoostProgress] = useState<number>(0)
  const [currentBoostLevel, setCurrentBoostLevel] = useState<number>(1)
  const [boostColor, setBoostColor] = useState<string>(boostColorValues['1'])
  const [backgroundBoostColor, setBackgroundBoostColor] =
    useState<string>('#9CA3AF')
  const initialBackground = '#9CA3AF'
  const [progressBarkey, setProgressBarKey] = useState(0) // Initial key

  const rerenderBar = () => {
    setProgressBarKey((prevKey) => prevKey + 1) // Increment the key to force re-render
  }

  useEffect(() => {
    setProgressString(
      encodeHtmlEntities(challenge[challengeProgression.currentIndex])
    )
    setActiveString(challenge[challengeProgression.currentIndex])
  }, [challengeProgression])

  // const handleCopyPaste = (event) => {
  //     // event.preventDefault();
  //     // alert('No cheating')
  // };

  useEffect(() => {
    if (!completed) {
      const intervalId = setInterval(() => {
        if (boostProgress >= 100) {
          rerenderBar()
          setCurrentBoostLevel((prev) => prev * 2)
          setBoostProgress(0)
          setBoostColor(boostColorValues[currentBoostLevel * 2])
          setBackgroundBoostColor(boostColorValues[currentBoostLevel])
          // flagged = true
        } else if (boostProgress <= 0) {
          if (currentBoostLevel > 1) {
            rerenderBar()
            setBoostProgress(100)
            setCurrentBoostLevel((prev) => prev / 2)
          }
          setBoostColor(
            boostColorValues[currentBoostLevel / 2] ?? boostColorValues[1]
          )
          setBackgroundBoostColor(
            boostColorValues[currentBoostLevel / 4] ?? initialBackground
          )
        }
        setBoostProgress((prev) => {
          if (prev > 0) {
            return prev - 1
          } else {
            return 0
          }
        })
      }, 100)
      return () => clearInterval(intervalId)
    }
  }, [completed, boostProgress, currentBoostLevel])

  const handleChange = (event) => {
    if (completed) return
    const userInput = event.target.value
    setInputValue(userInput)

    if (
      userInput === activeString.substring(0, userInput.length) &&
      allWeightedLevels
    ) {
      if (lastKey !== 'Backspace') {
        setScore((prev) => prev + allWeightedLevels[currentWeightedLevel])
        setBoostProgress((prev) => prev + 5)
        // setBoostProgress((prev) => prev + 20)
      } else {
        setScore(
          (prev) =>
            prev - allWeightedLevels[currentWeightedLevel] * currentBoostLevel
        )
      }
      setInitialErrorIndex(-1)
      const matchedString = `<mark class='highlight'>${encodeHtmlEntities(userInput)}</mark>`
      const remainingString = encodeHtmlEntities(
        activeString.substring(userInput.length)
      )
      setProgressString(matchedString + remainingString)
      if (userInput.length === activeString.length) {
        if (
          challengeProgression.currentIndex ===
          challengeProgression.totalIndex - 1
        ) {
          setInProgress(false)
          setCompleted(true)
        } else {
          setChallengeProgression((prev) => ({
            ...prev,
            currentIndex: prev.currentIndex + 1,
          }))
          setInputValue('')
        }
      }
    } else {
      // Error scenario
      setBoostProgress(0)
      setCurrentBoostLevel(1)
      const errorIndex =
        initialErrorIndex === -1 ? userInput.length - 1 : initialErrorIndex
      if (initialErrorIndex === -1) {
        setInitialErrorIndex(userInput.length - 1)
      }

      const errorFlag = `<mark class='error-highlight'>${encodeHtmlEntities(activeString.substring(errorIndex, userInput.length))}</mark>`
      setProgressString(
        `<mark class='highlight'>${encodeHtmlEntities(activeString.substring(0, errorIndex))}</mark>` +
          errorFlag +
          encodeHtmlEntities(activeString.substring(userInput.length))
      )
    }
  }

  return (
    <>
      <BoostMeter
        boostProgress={boostProgress}
        currentBoostLevel={currentBoostLevel}
        boostColor={boostColor}
        backgroundBoostColor={backgroundBoostColor}
        key={progressBarkey}
      />
      <div className="mt-14 flex w-full justify-center">
        <input
          className="w-full rounded p-4 outline outline-2 outline-offset-2 outline-blue-500"
          type="text"
          onChange={handleChange}
          // onPaste={handleCopyPaste}
          value={inputValue}
          disabled={completed}
          onKeyDown={(e) => setLastKey(e.key)}
        />
      </div>
    </>
  )
}
