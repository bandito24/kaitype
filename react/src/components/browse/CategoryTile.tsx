import {useNavigate} from 'react-router-dom'
import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import {Selection} from '@/lib/types.tsx'
import OptionsTile from '@/components/browse/OptionsTile.tsx'
import OptionImage from '@/components/browse/OptionImage.tsx'

export default function CategoryTile({selection}: {selection: Selection}) {
  const navigate = useNavigate()
  const {options} = useOptionsContext()

  const completedStatus =
    selection.userProgress && selection.submissions_count
      ? Math.ceil(
          (selection.userProgress / selection.submissions_count) * 100
        ).toString() + '% complete'
      : undefined

  if (!options) {
    navigate('/')
    return
  }

  return (
    <>
      <OptionsTile
        action={() =>
          selection.slug && options?.action(navigate, selection.slug)
        }
        image={
          <OptionImage
            completedInfo={undefined}
            view="categories"
            redirectParam={selection.slug}
          />
        }
        name={selection.name}
        progress={completedStatus}
        context={selection.submissions_count + ' challenges await'}
      />
    </>
  )
}
