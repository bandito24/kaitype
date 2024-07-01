import {fetchCategoryChallenges} from '@/services/api.tsx'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import OptionsContent from '@/components/browse/OptionsContent.tsx'
import usePaginatedQuery from '@/hooks/usePaginatedQuery.tsx'

export default function ChallengesList() {
  const {setOptions, options} = useOptionsContext()
  const {category} = useParams()
  const navigate = useNavigate()

  if (!category) {
    console.error('must include category param for Challenges List component')
    navigate('/browse')
  }

  const {isSuccess: isChallengesSuccess, data: challenges} = usePaginatedQuery(
    {view: category ?? 'category'},
    fetchCategoryChallenges,
    true
  )

  useEffect(() => {
    if (challenges && isChallengesSuccess) {
      console.log(challenges)
      setOptions({
        view: 'challenges',
        title: `Select a ${challenges.categoryName} challenge!`,
        description: `You have ${challenges.categoryCount} to choose from.`,
        selections: challenges.categoryChallenges.data,
        action: (navigate, challengeId: string | number) =>
          navigate(`/challenge/${challengeId}`),
      })
    }
  }, [challenges, isChallengesSuccess])

  return (
    <div>
      {options?.view === 'challenges' && (
        <div>
          <OptionsContent
            fetchFunction={fetchCategoryChallenges}
            data={challenges.categoryChallenges}
          />
        </div>
      )}
    </div>
  )
}
