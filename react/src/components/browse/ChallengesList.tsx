import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "@/services/axios-client.tsx";
import ChallengesOption from "@/components/browse/ChallengesOption.tsx";
import PaginationContainer from "@/components/utilities/pagination/PaginationContainer.tsx";


type CategoryChallenge = {
    title: string,
    id: number
    description: string
}
//
type CategoryChallengeResponse = {
    categoryName: string,
    challenges: CategoryChallenge[]
    categoryCount: number
}
type PageObj = {
    currentPage: number,
    lastPage: number
}

export default function ChallengesList() {
    const [transitionOut, setTransitionOut] = useState<boolean>(false)
    const [categoryChallenges, setCategoryChallenges] = useState<CategoryChallengeResponse | null>(null)
    const [pageObj, setPageObj] = useState<PageObj | null>(null)
    const {category} = useParams();

    useEffect(() => {
        async function fetchChallenges() {
            try {
                let requestingPage = pageObj?.currentPage ?? 1
                const response = await axiosClient.get(`/categories/${category}?page=${requestingPage}`);
                if (response.status === 200) {
                    const {data} = response;
                    const {categoryChallenges} = data
                    console.log(data)
                    setCategoryChallenges(() => ({
                        categoryName: data.categoryName,
                        challenges: categoryChallenges.data,
                        categoryCount: data.categoryCount
                    }))
                    setPageObj(() => ({
                        currentPage: categoryChallenges.current_page,
                        lastPage: categoryChallenges.last_page
                    }))

                }
            } catch (error) {
                console.error('Error fetching challenges:', error);
                // Handle errors if any
            }

        }

        fetchChallenges();
    }, [pageObj?.currentPage]);


    return (
        <>
            {categoryChallenges && (
                <>
                    <div
                        className={`flex flex-wrap w-full flex-col items-center text-center ${transitionOut && 'animate-fadeOut'}`}>
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Select
                            a {categoryChallenges.categoryName} challenge!</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">You have {categoryChallenges.categoryCount} to choose from. To preview, hover over</p>
                    </div>
                    <div className={`container px-5 py-24 mx-auto anim ${transitionOut && 'animate-transition-out'}`}>
                        {categoryChallenges &&
                            categoryChallenges.challenges.map(challenge => (
                                <ChallengesOption
                                    key={challenge.id}
                                    challengeId={challenge.id}
                                    title={challenge.title}
                                    description={challenge.description}
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

            )}
        </>

    )

}