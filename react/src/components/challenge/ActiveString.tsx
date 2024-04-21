import {useEffect, useState} from 'react'
import {encodeHtmlEntities} from '@/lib/helperFunctions.tsx'

type ActiveStringProps = {
  progressString: string
  jsonChallengeContent: string
  challengeProgression: {currentIndex: number; totalIndex: number}
}

export default function ActiveString({
  progressString,
  jsonChallengeContent,
  challengeProgression,
}: ActiveStringProps) {
  const [contentArr, setContentArr] = useState<string[] | null>(null)
  const [currentProgressLine, setCurrentProgressLine] = useState<number>(0)

  useEffect(() => {
    if (!contentArr) {
      setContentArr(() => JSON.parse(jsonChallengeContent))
    }
  }, [contentArr])

  useEffect(() => {
    if (contentArr) {
      setCurrentProgressLine(challengeProgression.currentIndex)
    }
  }, [challengeProgression])

  return (
    <div className="absolute z-50">
      <pre>
        {contentArr &&
          contentArr.map((string, index) => (
            <p
              className="text-left"
              key={index}
              style={{color: index >= currentProgressLine ? 'gray' : 'black'}}
              dangerouslySetInnerHTML={{
                __html:
                  index === currentProgressLine
                    ? progressString
                    : encodeHtmlEntities(string),
              }}></p>
          ))}
      </pre>
    </div>
  )
}
