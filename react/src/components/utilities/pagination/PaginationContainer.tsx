import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {useState} from 'react'
import {useOptionsContext} from '@/components/browse/OptionsContext.tsx'
import usePaginatedQuery from '@/hooks/usePaginatedQuery.tsx'
import {useParams} from 'react-router-dom'

type PageProps = {
  links: {pageCurrent: number; pageLast: number}
  fetchFunction: (page: string, category?: 'string') => any
}

export default function PaginationContainer({links, fetchFunction}: PageProps) {
  const [currentAndTotal, setCurrentAndTotal] = useState<{
    current: number
    total: number
  }>({current: links.pageCurrent, total: links.pageLast})
  const {category} = useParams<{category: string}>()

  const {options, setOptions} = useOptionsContext()
  const queryParam = options?.view === 'categories' ? 'categories' : category

  const {changePage} = usePaginatedQuery(
    {view: queryParam},
    fetchFunction,
    false
  )
  if (!options) return null

  async function modifyPage(pageDirection: 1 | -1) {
    let result = await changePage(pageDirection)
    if (result?.categoryChallenges) result = result.categoryChallenges

    setCurrentAndTotal((prev) => ({...prev, current: result.current_page}))
    setOptions((prevOptions) => {
      if (prevOptions) {
        return {
          ...prevOptions,
          selections: result.data,
        }
      } else {
        return null
      }
    })
  }

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={`invisible cursor-pointer ${currentAndTotal.current !== 1 ? 'visible' : ''}`}>
            <PaginationPrevious onClick={async () => await modifyPage(-1)} />
          </PaginationItem>
          <PaginationItem
            className={`invisible cursor-pointer ${currentAndTotal.current !== currentAndTotal.total ? 'visible' : ''}`}>
            <PaginationNext onClick={async () => await modifyPage(1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
