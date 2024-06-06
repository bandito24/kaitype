import {useNavigate} from 'react-router-dom'
import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import {ReactNode} from 'react'

type Props = {
  action: () => void
  image: ReactNode
  name: string
  progress: string | number | undefined
  context: string | undefined
}

export default function OptionsTile({
  action,
  image,
  name,
  progress,
  context,
}: Props) {
  const navigate = useNavigate()
  const {options} = useOptionsContext()

  if (!options) {
    navigate('/')
    return
  }

  return (
    <>
      <div
        className="relative -m-4 inline-flex w-60 animate-fadeIn flex-wrap"
        onClick={action}>
        <div className="w-full cursor-pointer rounded-lg border border-gray-200 p-4 transition duration-200 ease-in-out hover:bg-amber-200">
          {image}
          <h2 className="title-font mb-2 text-lg font-medium text-gray-900">
            {name}
          </h2>

          <p className="animate-wiggle text-base leading-relaxed">{context}</p>
          <p className="absolute right-3 top-0 text-xs text-green-300">
            {progress}
          </p>
        </div>
      </div>
    </>
  )
}
