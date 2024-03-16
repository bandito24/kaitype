// type Props = {
//   previousResults: typeof PreviousResults
// }

type Props = {
  previousResults: PreviousResult[]
}

type PreviousResult = {
  user_id: number
  formatted_time: string
  milliseconds: number
  username: string
}

export default function PreviousResults({previousResults}: Props) {
  return (
    <div>
      {previousResults.map((result, index) => (
        <p key={index}>
          User ID: {result.user_id}, Formatted Time: {result.formatted_time},
          Milliseconds: {result.milliseconds}, Username: {result.username}
        </p>
      ))}
    </div>
  )
}
