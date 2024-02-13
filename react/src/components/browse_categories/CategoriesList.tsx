import {useEffect, useState} from "react";
import axiosClient from "@/services/axios-client.tsx";
import CategoryOption from "@/components/browse_categories/CategoryOption.tsx";
import {RetrievedCategory} from "@/lib/types.tsx";
import PaginationContainer from "@/components/utilities/pagination/PaginationContainer.tsx";


export default function CategoriesList() {
    const [pageNumber, setPageNumber] = useState(1)
    const [categoryList, setCategoryList] = useState<RetrievedCategory[] | null>(null)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const axiosResponse = await axiosClient.get('/categories');
                if (axiosResponse.status === 200) {
                    const categories: Array<RetrievedCategory> = axiosResponse.data;
                    console.log(categories)
                    setCategoryList(categories)
                    console.log(categoryList)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchCategories();
    }, []);


    return (

        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Select your
                            Kaitype Category</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr
                            hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
                    </div>
                    {categoryList &&
                        categoryList.map(response => (
                            <CategoryOption
                                key={response.id}
                                category={response}
                             />
                        ))


                    }
                </div>
            </section>
            <PaginationContainer />

        </div>
    )
}