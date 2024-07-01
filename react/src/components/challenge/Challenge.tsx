import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import axiosClient from '@/services/axios-client.tsx'

import {
  useChallengeContext,
} from '@/components/challenge/ChallengeContext.tsx'
import {useQuery} from '@tanstack/react-query'
import ChallengeTool from '@/components/utilities/ChallengeTool.tsx'
import ActiveTyping from '@/components/challenge/ActiveTyping.tsx';


export default function Challenge() {
  const {id: challengeId} = useParams()


  const {challenge, setChallenge} = useChallengeContext()

  const {
    isSuccess,
    data: challengeData,
    // isError,
  } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: async () => {
      console.log('fetched')
      return (await axiosClient.get(`/submission/${challengeId}`))?.data.submission
    }

  })
  useEffect(() => {
    console.log(challengeData)
    if (!challengeData) return
    const challengeContent = new ChallengeTool().formatChallengeContentJson(
      challengeData.content
    )
    const levelWeights = (new ChallengeTool()).calculateWeightedLevels(challengeData.char_count)
    setChallenge({
      currentWeightedLevelKey: 1,
      allWeightedLevels: levelWeights,
      inProgress: true,
      completed: false,
      name: challengeData.name,
      id: challengeData.id,
      challengeProgress: {
        currentIndex: 0,
        totalIndex: challengeContent.length - 1,
      },
      challengeContent: challengeContent,
    })
  }, [isSuccess, challengeData])

  return (
    <div className="flex justify-between">
      {isSuccess && challenge && challenge.challengeContent.length > 0 && (
        <ActiveTyping />
      )}
    </div>
  )
}
