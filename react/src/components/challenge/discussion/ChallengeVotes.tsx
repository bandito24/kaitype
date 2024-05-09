import {useState} from 'react'
import {voteComment} from '@/services/api.tsx'

type Props = {
  votes: number
  setErrors: React.Dispatch<React.SetStateAction<string | null>>
  userId: number | null
}
type voteDirection = 1 | -1

export default function ChallengeVotes({votes, setErrors, userId}: Props) {
  const [vote, setVote] = useState<number>(votes)
  const [voteDirection, setVoteDirection] = useState<'up' | 'down' | 'none'>(
    'none'
  )
  const VOTE_COLOR = {up: 'rgb(253, 230, 138)', down: '#ADD8E6'}

  async function handleClick(direction: voteDirection) {
    if (!userId) {
      setErrors('You must be logged in to vote')
      return
    }
    await voteComment({userId: userId, direction: direction})
    setVote((prev) => prev + direction)
    setVoteDirection(direction > 0 ? 'up' : 'down')
  }

  return (
    <>
      <div className="bg flex flex-col items-center justify-center justify-items-center align-middle">
        <button
          className="hover:bg-voteUp rounded-full border p-2"
          style={{backgroundColor: voteDirection === 'up' ? VOTE_COLOR.up : ''}}
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
          className="hover:bg-voteDown ml-0 rounded-full border p-2"
          style={{
            backgroundColor: voteDirection === 'down' ? VOTE_COLOR.down : '',
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
