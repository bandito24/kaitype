import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'

export default function OptionsHeader() {
  const {options} = useOptionsContext()
  const {title, description} = options ?? {}

  return (
    <>
      <div
        // className={`flex w-full flex-col flex-wrap items-center text-center ${transitionOut && 'animate-fadeOut'}`}>
        className={`flex w-full flex-col flex-wrap items-center text-center`}>
        <h1 className="title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <p className="w-full leading-relaxed text-gray-500 lg:w-1/2">
          {description}
        </p>
      </div>
    </>
  )
}
