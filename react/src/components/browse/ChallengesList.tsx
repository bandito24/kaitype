import {useQuery} from '@tanstack/react-query'
import {fetchCategoryChallenges} from '@/services/api.tsx'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import OptionsHeader from '@/components/browse/OptionsHeader.tsx'
import OptionsContent from '@/components/browse/OptionsContent.tsx'

export default function ChallengesList() {
  const {setOptions} = useOptionsContext()
  const {category} = useParams()
  const navigate = useNavigate()

  if (!category) {
    console.error('must include category param for Challenges List component')
    navigate('/browse')
  }

  const request = {category: category ?? null, page: '1'}
  const {data: challenges, isSuccess: isChallengesSuccess} = useQuery({
    queryKey: ['challenges', request],
    queryFn: () => fetchCategoryChallenges(request),
    enabled: !!category,
  })

  useEffect(() => {
    if (challenges && isChallengesSuccess && category) {
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
      {challenges && (
        <div>
          <OptionsHeader />
          <OptionsContent />
        </div>
      )}
    </div>
  )
}
