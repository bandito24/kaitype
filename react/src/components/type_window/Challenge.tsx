import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axiosClient from '@/services/axios-client.tsx'
import TypeWindow from '@/components/type_window/TypeWindow.tsx'
import PreviousResults from '@/components/type_window/PreviousResults.tsx'

type ChallengeMetadata = {
  submission: ChallengeContent
  previousResults: PreviousResult[]
}
type PreviousResult = {
  user_id: number
  formatted_time: string
  milliseconds: number
  username: string
}

type ChallengeContent = {
  title: string
  description: string
  content: string //json
  id: number
}

export default function Challenge() {
  const [challengeMetadata, setChallengeMetadata] =
    useState<null | ChallengeMetadata>()
  const [timer, setTimer] = useState(0)
  const {id} = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
        const challengeResponse = await axiosClient.get(`/submission/${id}`)
        console.log(challengeResponse)
        setChallengeMetadata(challengeResponse.data)
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
          <PreviousResults
            previousResults={challengeMetadata.previousResults}
            timer={timer}
          />
          <TypeWindow
            challengeContent={challengeMetadata.submission}
            timer={timer}
            setTimer={setTimer}
          />
        </>
      )}
    </div>
  )
}
