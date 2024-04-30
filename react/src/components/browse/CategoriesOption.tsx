import {RetrievedCategory} from "@/lib/types.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";



type Props = {
    category: RetrievedCategory,
    setTransitionOut: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CategoriesOption({category, setTransitionOut}: Props) {
    const navigate = useNavigate();
    function handleOnClick(){
        setTransitionOut(true);
        setTimeout(()=> {
            navigate(`/browse/${category.slug}`)
        }, 2000)
    }
    return (
        <>
                    <div className="flex flex-wrap -m-4 animate-fadeIn"
                         onClick={handleOnClick}
                    >
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg hover:bg-amber-200 cursor-pointer transition duration-200 ease-in-out">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    {/*<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">*/}
                                    {/*    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>*/}
                                    {/*</svg>*/}
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{category.name}</h2>
                                <p className="animate-wiggle leading-relaxed text-base">{category.submissions_count} challenges await</p>
                            </div>
                        </div>
                    </div>
        </>
    )
}