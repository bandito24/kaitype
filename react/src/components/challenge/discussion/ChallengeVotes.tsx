import {useEffect, useState} from 'react'
import {voteComment} from '@/services/api.tsx'
import {destructureErrorObject} from '@/lib/helperFunctions.tsx'
import {PastVote} from '@/lib/types.tsx'

type Props = {
  votes: number
  setErrors: React.Dispatch<React.SetStateAction<string | null>>
  userId: number | null
  commentId: number
  challengeId: string | undefined
  pastVotes: PastVote[] | null | []
  commentUserId: number
}
type voteDirection = 1 | -1 | 2 | -2

export default function ChallengeVotes({
  votes,
  setErrors,
  userId,
  commentId,
  challengeId,
  pastVotes,
  commentUserId,
}: Props) {
  const [vote, setVote] = useState<number>(votes)
  const [userVoted, setUserVoted] = useState<'up' | 'down' | 'none'>('none')
  const VOTE_COLOR = {up: 'rgb(253, 230, 138)', down: '#ADD8E6'}

  useEffect(() => {
    if (!pastVotes || pastVotes.length < 1) return
    const matchIndex = pastVotes.findIndex(
      (o) => o.challenge_comment_id === commentId
    )
    if (matchIndex !== -1) {
      setVote(pastVotes[matchIndex].direction)
      const voteStatus = pastVotes[matchIndex].direction > 0 ? 'up' : 'down'
      setUserVoted(voteStatus)
    } else {
      if (commentUserId === userId) {
        setUserVoted('up')
      }
    }
  }, [])

  async function handleClick(direction: voteDirection) {
    try {
      let value = direction
      if (!userId) {
        setErrors('You must be logged in to vote')
        return
      }
      if (
        (userVoted === 'up' && direction === 1) ||
        (userVoted === 'down' && direction === -1)
      )
        return
      if (
        (userVoted === 'up' && direction === -1) ||
        (userVoted === 'down' && direction === 1)
      )
        direction = direction * 2
      setVote((prev) => prev + direction)
      setUserVoted(direction > 0 ? 'up' : 'down')
      await voteComment({
        challenge_comment_id: commentId,
        direction: value,
        submission_id: challengeId,
      })
    } catch (e) {
      setErrors('Something went wrong with the vote. Apologies')
      console.error(e)
      console.error(destructureErrorObject(e))
    }
  }

  return (
    <>
      <div className="bg flex flex-col items-center justify-center justify-items-center align-middle">
        <button
          className="rounded-full border p-2 hover:bg-voteUp"
          style={{backgroundColor: userVoted === 'up' ? VOTE_COLOR.up : ''}}
          onClick={() => handleClick(1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
        <span className="text-md ml-0 font-bold">{vote}</span>
        <button
          className="ml-0 rounded-full border p-2 hover:bg-voteDown"
          style={{
            backgroundColor: userVoted === 'down' ? VOTE_COLOR.down : '',
          }}
          onClick={() => handleClick(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </>
  )
}
