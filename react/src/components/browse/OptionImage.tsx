import CompletedChallengeIcon from '@/components/browse/CompletedChallengeIcon.tsx'

type Props = {
  redirectParam: string | number | undefined
  view: 'categories' | 'challenges'
  completedInfo: string | undefined
}

export default function OptionImage({
  redirectParam,
  view,
  completedInfo = undefined,
}: Props) {
  const svgStyle = {borderRadius: '50%'}

  return (
    <>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
        {view === 'categories' ? (
          <img
            src={`/categoryTagSvgs/${redirectParam}.svg`}
            alt={`${redirectParam}-logo`}
            style={svgStyle}
          />
        ) : (
          <CompletedChallengeIcon
            status={completedInfo ? 'complete' : 'incomplete'}
          />
        )}
      </div>
    </>
  )
}
