import {useEffect, useState} from "react";
import axiosClient from "@/services/axios-client.tsx";
import {RetrievedCategory} from "@/lib/types.tsx";
import PaginationContainer from "@/components/utilities/pagination/PaginationContainer.tsx";
import CategoriesOption from "@/components/browse/CategoriesOption.tsx";



type PageObj = {
    currentPage: number;
    lastPage: number
}


export default function CategoriesList() {
    const [transitionOut, setTransitionOut] = useState<boolean>(false)
    const [pageObj, setPageObj] = useState<PageObj | null>(null)
    const [categoryList, setCategoryList] = useState<RetrievedCategory[] | null>(null)


    useEffect(() => {
        async function fetchCategories() {
            try {
                let requestingPage = pageObj?.currentPage ?? 1
                const axiosResponse = await axiosClient.get(`/categories?page=${requestingPage}`);
                if (axiosResponse.status === 200) {
                    const response: any = axiosResponse.data
                    const categories: Array<RetrievedCategory> = response.data;
                    setPageObj(() => ({
                        currentPage: response.current_page,
                        lastPage: response.last_page
                    }))

                    console.log(response)
                    setCategoryList(categories)
                    console.log(categoryList)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchCategories();
    }, [pageObj?.currentPage]);


    return (

        <>
            <div
                className={`flex flex-wrap w-full flex-col items-center text-center ${transitionOut && 'animate-fadeOut'}`}>
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Select your
                    Kaitype Category</h1>
                <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr
                    hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
            </div>
            <div className={`container px-5 py-24 mx-auto anim ${transitionOut && 'animate-transition-out'}`}>
                {categoryList &&
                    categoryList.map(response => (
                        <CategoriesOption
                            key={response.id}
                            category={response}
                            setTransitionOut={setTransitionOut}
                        />
                    ))
                }
            </div>
            {pageObj &&
                <PaginationContainer
                    pageObj={pageObj}
                    setPageObj={setPageObj}
                />
            }
        </>
    )
}