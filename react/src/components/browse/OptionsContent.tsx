import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import ChallengeTile from '@/components/browse/ChallengeTile.tsx'
import CategoryTile from '@/components/browse/CategoryTile.tsx'
import PaginationContainer from '@/components/utilities/pagination/PaginationContainer.tsx'

type Props = {
  data: {current_page: number; last_page: number}
  // fetchFunction: (page: string, category?: string) => Promise<any>
  fetchFunction: any
}

export default function OptionsContent({data, fetchFunction}: Props) {
  const {options} = useOptionsContext()
  if (!options) return
  const {selections} = options ?? {}
  const RenderTile =
    options && options.view === 'categories' ? CategoryTile : ChallengeTile

  return (
    <>
      <div
        // className={`flex w-full flex-col flex-wrap items-center text-center ${transitionOut && 'animate-fadeOut'}`}>
        className={`flex w-full flex-col flex-wrap items-center text-center`}>
        <h1 className="title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl">
          {options.title}
        </h1>
        <p className="w-full leading-relaxed text-gray-500 lg:w-1/2">
          {options.description}
        </p>
      </div>
      <div
        className={`anim container mx-auto grid grid-flow-row grid-cols-fill-200 grid-rows-5 gap-16 px-5 py-24`}>
        {selections &&
          selections.map((selection) => (
            <RenderTile
              key={selection.id}
              selection={selection}
            />
          ))}
      </div>
      <PaginationContainer
        links={{
          pageCurrent: data.current_page,
          pageLast: data.last_page,
        }}
        fetchFunction={fetchFunction}
      />
    </>
  )
}
