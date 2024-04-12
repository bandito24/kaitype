type Props = {
  boostProgress: number
  currentBoostLevel: number
  boostColor: string
  backgroundBoostColor: string
}
export default function BoostMeter({
  boostProgress,
  currentBoostLevel,
  boostColor,
  backgroundBoostColor,
}: Props) {
  return (
    <>
      <div className="top-16 mb-2">
        <div
          className="flex h-14 w-96 overflow-hidden rounded-full"
          style={{
            backgroundColor: `${backgroundBoostColor}`,
          }}>
          <div
            style={{
              width: `${boostProgress}%`,
              backgroundColor: `${boostColor}`,
              transition: 'width 400ms linear', // Conditionally set the transition property
            }}
            className="z-50 w-96 rounded-full">
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
