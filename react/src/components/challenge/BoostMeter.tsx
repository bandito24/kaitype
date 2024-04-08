import {useEffect, useState} from 'react'
import {boostColorValues} from '@/components/utilities/boostColors.tsx'

type Props = {
  completed: boolean
  boostProgress: number
  setBoostProgress: React.Dispatch<React.SetStateAction<number>>
  setCurrentBoostLevel: React.Dispatch<React.SetStateAction<number>>
  currentBoostLevel: number
}
export default function BoostMeter({
  completed,
  boostProgress,
  setBoostProgress,
  setCurrentBoostLevel,
  currentBoostLevel,
}: Props) {
  const [boostColor, setBoostColor] = useState<string>(boostColorValues['1'])
  const [prevBoostColor, setPrevBoostColor] = useState<string>('#9CA3AF')
  const [smoothTransition, setSmoothTransition] = useState<boolean>(true)
  useEffect(() => {
    if (!completed) {
      let flagged = false
      const intervalId = setInterval(() => {
        if (boostProgress >= 100) {
          setCurrentBoostLevel((prev) => prev * 2)
          setBoostColor(boostColorValues[currentBoostLevel * 2])
          setPrevBoostColor(boostColorValues[currentBoostLevel])
          setBoostProgress(0)
          setSmoothTransition(false)
          flagged = true
          // return
        } else if (boostProgress <= 0) {
          if (currentBoostLevel > 1) {
            setBoostProgress(100)
            setCurrentBoostLevel((prev) => prev / 2)
            setSmoothTransition(false)
            flagged = true
          }
        }
        if (boostColor !== boostColorValues[currentBoostLevel]) {
          setBoostColor(boostColorValues[currentBoostLevel])
          setPrevBoostColor(
            boostColorValues[currentBoostLevel / 2] ?? '#9CA3AF'
          )
          setSmoothTransition(false)
          flagged = true
        }
        setBoostProgress((prev) => {
          if (!smoothTransition && !flagged) setSmoothTransition(true)
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

  return (
    <>
      <div className="mb-2">
        <div
          className="flex h-14 w-96 overflow-hidden rounded-full"
          style={{
            backgroundColor: `${prevBoostColor}`,
          }}>
          <div
            style={{
              width: `${boostProgress}%`,
              backgroundColor: `${boostColor}`,
              transition: !smoothTransition ? 'none' : 'width 400ms linear', // Conditionally set the transition property
            }}
            className="z-50 rounded-full">
            {'\u00A0'}
          </div>
        </div>
        {currentBoostLevel > 1 && (
          <p className="absolute">Boost: x{currentBoostLevel}</p>
        )}
      </div>
    </>
  )
}
