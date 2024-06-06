import {useNavigate} from 'react-router-dom'
import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import OptionsTile from '@/components/browse/OptionsTile.tsx'
import {Selection} from '@/lib/types.tsx'
import OptionImage from '@/components/browse/OptionImage.tsx'

export default function ChallengeTile({selection}: {selection: Selection}) {
  const navigate = useNavigate()
  const {options} = useOptionsContext()

  if (!options) {
    navigate('/')
    return
  }

  return (
    <>
      <OptionsTile
        action={() => options.action(navigate, selection.id)}
        image={
          <OptionImage
            completedInfo={selection.position ? 'true' : undefined}
            view="challenges"
            redirectParam={selection.id}
          />
        }
        name={selection.name}
        progress={selection.position && selection.position + 'th place'}
        context={selection.description}
      />
    </>
  )
}
