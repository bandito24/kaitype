import {useEffect} from 'react'
import OptionsContent from '@/components/browse/OptionsContent.tsx'
import {useOptionsContext} from './OptionsContext'
import {fetchCategories} from '@/services/api.tsx'
import usePaginatedQuery from '@/hooks/usePaginatedQuery.tsx'

export default function CategoriesList() {
  const {options, setOptions} = useOptionsContext()

  const {isSuccess: isCategoriesSuccess, data: categories} = usePaginatedQuery(
    {view: 'categories'},
    fetchCategories,
    true
  )

  useEffect(() => {
    if (categories && isCategoriesSuccess) {
      setOptions({
        view: 'categories',
        title: 'Select A Kaitype Category',
        description: 'my description',
        selections: categories.data,
        action: (navigate: any, param: string | number) =>
          navigate(`/browse/${param}`),
      })
    }
  }, [categories, isCategoriesSuccess])

  return (
    <div>
      {options && (
        <>
          <OptionsContent
            data={categories}
            fetchFunction={fetchCategories}
          />
        </>
      )}
    </div>
  )
}
