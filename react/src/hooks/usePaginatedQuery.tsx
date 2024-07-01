import {useSearchParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {useState} from 'react'

export default function usePaginatedQuery(
  queryKey: {view: string | undefined},
  fetchCallback,
  isEnabled: boolean
) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState<string>(searchParams.get('page') || '1')

  const {data, isSuccess, refetch} = useQuery({
    queryKey: [queryKey, page],
    queryFn: async () => await fetchCallback(page, queryKey.view),
    enabled: isEnabled,
  })

  async function changePage(pageDirection: 1 | -1) {
    const newPage = (parseInt(page) + pageDirection).toString()
    setPage(newPage)
    await new Promise((resolve) => setTimeout(resolve, 0))
    setSearchParams({page: newPage.toString()})
    const {data} = await refetch()
    return data
  }

  return {data, isSuccess, changePage, refetch}
}
