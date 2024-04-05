type Competitor = {
  formattedTime: string
  username: string
  currentPosition: number | null | undefined
  competitorId: number
}
type Props = {
  competitor: Competitor
  userId: number
}

export default function PreviousCompetitor({competitor, userId}: Props) {
  return (
    <>
      <li className="py-3 sm:py-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8 rounded-full"
              src="/test_avatar1.jpeg"
              alt="Neil image"
            />
          </div>
          <div className="ms-4 min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {competitor.currentPosition}. {competitor.username}
            </p>
            {competitor.competitorId === userId && (
              <p className="truncate text-sm text-green-300 dark:text-gray-400">
                FORMER ATTEMPT
              </p>
            )}
          </div>
          <div className="box-content inline-flex w-[80px] items-center text-base font-semibold text-gray-700 dark:text-white">
            {competitor.formattedTime}
          </div>
        </div>
      </li>
    </>
  )
}
