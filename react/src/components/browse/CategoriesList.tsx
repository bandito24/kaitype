import {useEffect} from 'react'
import OptionsHeader from '@/components/browse/OptionsHeader.tsx'
import OptionsContent from '@/components/browse/OptionsContent.tsx'
import {useOptionsContext} from './OptionsContext'
import {useQuery} from '@tanstack/react-query'
import {fetchCategories} from '@/services/api.tsx'

export default function CategoriesList() {
  const {setOptions} = useOptionsContext()

  // Query for categories if no category is selected
  const {data: categories, isSuccess: isCategoriesSuccess} = useQuery({
    queryKey: ['categories', '1'],
    queryFn: () => fetchCategories('1'),
  })

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
      {categories && (
        <div>
          <OptionsHeader />
          <OptionsContent />
        </div>
      )}
    </div>
  )
}
