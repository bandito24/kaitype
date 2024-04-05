import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axiosClient from '@/services/axios-client.tsx'
import TypeWindow from '@/components/challenge/TypeWindow.tsx'
import ChallengeRanking from '@/components/challenge/ChallengeRanking.tsx'
import {PreviousCompetitorType} from '@/lib/types.tsx'

type ChallengeMetadata = {
  submission: ChallengeContent
  previousResults: PreviousCompetitorType[]
}

type ChallengeContent = {
  title: string
  description: string
  content: string //json
  id: number
  char_count: number
}

export default function Challenge() {
  const [challengeMetadata, setChallengeMetadata] =
    useState<null | ChallengeMetadata>()
  const [completed, setCompleted] = useState<boolean>(false)
  const [inProgress, setInProgress] = useState<boolean>(false)
  const [allWeightedLevels, setAllWeightedLevels] = useState<null | {
    [key: string]: number
  }>(null)
  const [currentWeightedLevel, setCurrentWeightedLevel] = useState<number>(1)
  const {id} = useParams()

  function calculateWeightedLevels(charCount: number) {
    const levelCount = Math.floor(charCount / 30)
    const levels: {[key: string]: number} = {}
    for (let i = 1; i <= levelCount; i++) {
      levels[i] = levelCount - i + 1
    }
    if (levelCount === 0) levels['1'] = 1
    console.log(levels)
    return levels
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const challengeResponse = await axiosClient.get(`/submission/${id}`)
        console.log(challengeResponse)
        setChallengeMetadata(challengeResponse.data)
        const allWeightsForLevel = calculateWeightedLevels(
          challengeResponse.data.submission.char_count
        )
        setAllWeightedLevels(allWeightsForLevel)
        setCurrentWeightedLevel(1)
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex justify-between">
      {challengeMetadata && (
        <>
          <ChallengeRanking
            previousCompetitors={challengeMetadata.previousResults}
            challengeId={challengeMetadata.submission.id}
            completed={completed}
            inProgress={inProgress}
            setCurrentWeightedLevel={setCurrentWeightedLevel}
            currentWeightedLevel={currentWeightedLevel}
            allWeightedLevels={allWeightedLevels}
          />
          <TypeWindow
            challengeContent={challengeMetadata.submission}
            completed={completed}
            setCompleted={setCompleted}
            setInProgress={setInProgress}
            allWeightedLevels={allWeightedLevels}
            currentWeightedLevel={currentWeightedLevel}
          />
        </>
      )}
    </div>
  )
}
