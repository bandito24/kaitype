import {useEffect, useState} from 'react'
import {RetrievedCategory} from '@/lib/types.tsx'
import PaginationContainer from '@/components/utilities/pagination/PaginationContainer.tsx'
import CategoriesOption from '@/components/browse/CategoriesOption.tsx'
import {useQuery} from '@tanstack/react-query'
import {fetchCategories} from '@/services/api.tsx'

type PageObj = {
  currentPage: number
  lastPage: number
}

export default function CategoriesList() {
  const [transitionOut, setTransitionOut] = useState<boolean>(false)
  const [pageObj, setPageObj] = useState<PageObj | null>(null)
  const [categoryList, setCategoryList] = useState<RetrievedCategory[] | null>(
    null
  )

  const {
    // status: statusCategories,
    // error: errorCategories,
    data: dataCategories,
  } = useQuery({
    queryKey: ['categories', pageObj?.currentPage ?? 1],
    queryFn: () => fetchCategories(pageObj?.currentPage ?? 1),
  })
  useEffect(() => {
    if (dataCategories) {
      setPageObj(() => ({
        currentPage: dataCategories.current_page,
        lastPage: dataCategories.last_page,
      }))
      setCategoryList(dataCategories.data)
    }
  }, [dataCategories])

  return (
    <>
      <div
        className={`flex w-full flex-col flex-wrap items-center text-center ${transitionOut && 'animate-fadeOut'}`}>
        <h1 className="title-font mb-2 text-2xl font-medium text-gray-900 sm:text-3xl">
          Select your Kaitype Category
        </h1>
        <p className="w-full leading-relaxed text-gray-500 lg:w-1/2">
          Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
          gentrify, subway tile poke farm-to-table.
        </p>
      </div>
      <div
        className={`anim container mx-auto px-5 py-24 ${transitionOut && 'animate-transition-out'}`}>
        {categoryList &&
          categoryList.map((response) => (
            <CategoriesOption
              key={response.id}
              category={response}
              setTransitionOut={setTransitionOut}
            />
          ))}
      </div>
      {pageObj && (
        <PaginationContainer
          pageObj={pageObj}
          setPageObj={setPageObj}
        />
      )}
    </>
  )
}

// useEffect(() => {
//     async function fetchCategories() {
//         try {
//             let requestingPage = pageObj?.currentPage ?? 1
//             const axiosResponse = await axiosClient.get(`/categories?page=${requestingPage}`);
//             if (axiosResponse.status === 200) {
//                 const response: any = axiosResponse.data
//                 const categories: Array<RetrievedCategory> = response.data;
//                 setPageObj(() => ({
//                     currentPage: response.current_page,
//                     lastPage: response.last_page
//                 }))
//
//                 console.log(response)
//                 setCategoryList(categories)
//                 console.log(categoryList)
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     }
//
//     fetchCategories();
// }, [pageObj?.currentPage]);
