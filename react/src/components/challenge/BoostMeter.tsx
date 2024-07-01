import {useEffect} from 'react'

type Props = {
  decrement: () => void,
  boostState: {
  boostProgress: number,
    boostLevel: number,
    boostColorValues: {[key: number]: string},
    bgBoostColor: string,
    incrementingBoostColor: string
}
}

export default function BoostMeter({decrement, boostState}: Props) {
  useEffect(() => {
      const intervalId = setInterval(() => {
        decrement()
      }, 250)
      return () => clearInterval(intervalId)
  }, [])


  return (
    <>
      <div className="top-16 mb-2">
        <div
          className="flex h-14 w-96 overflow-hidden rounded-full border-2"
          style={{
            backgroundColor: `${boostState.bgBoostColor}`,
          }}>
          <div
            style={{
              width: `${boostState.boostProgress}%`,
              backgroundColor: `${boostState.incrementingBoostColor}`,
              // backgroundColor: `white`,
              transition: 'width 400ms linear', // Conditionally set the transition property
            }}
            className="z-30 w-96 rounded-full">
            {'\u00A0'}
          </div>
        </div>
        {boostState.boostLevel > 1 && (
          <p className="absolute top-0">Boost: x{boostState.boostLevel}</p>
        )}
      </div>
    </>
  )
}


