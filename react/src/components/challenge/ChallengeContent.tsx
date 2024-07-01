import {useChallengeContext} from '@/components/challenge/ChallengeContext.tsx'
import ChallengeTool from '@/components/utilities/ChallengeTool.tsx'

type Props = {
  progressString: string
}

export default function ChallengeContent({progressString}: Props) {
  const {
    challenge: {challengeContent, challengeProgress},
  } = useChallengeContext()
  const encode = new ChallengeTool().encodeHtmlEntities


  return (
    <div className="z-50 border-2 rounded-full w-full px-20 py-10 flex justify-center flex-col items-center">
      <pre className="">
        {challengeContent.map((string, index) => {
          const indentLength = string.length - string.trim().length
          const spaceWidth = 10;
          return (
            <p
              key={index}
              style={{
                color: index >= challengeProgress.currentIndex ? 'gray' : 'black',
                paddingLeft: `${indentLength * spaceWidth}px`
              }}
              dangerouslySetInnerHTML={{
                __html:
                  index === challengeProgress.currentIndex
                    ? progressString
                    : encode(string.trim()),
              }}></p>
          )
        })}


      </pre>
</div>
  )
}
