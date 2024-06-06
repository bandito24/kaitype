import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import ChallengeTile from '@/components/browse/ChallengeTile.tsx'
import CategoryTile from '@/components/browse/CategoryTile.tsx'

export default function OptionsContent() {
  const {options} = useOptionsContext()
  console.log(options)
  const {selections} = options ?? {}
  const RenderTile =
    options && options.view === 'categories' ? CategoryTile : ChallengeTile

  return (
    <>
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
    </>
  )
}
