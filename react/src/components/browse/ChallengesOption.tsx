import React, {useEffect, useState} from "react";
import axiosClient from "@/services/axios-client.tsx";


type props = {
    title: string,
    challengeId: number,
    description: string,
    setTransitionOut: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChallengesOption({title, description, challengeId, setTransitionOut}: props) {
const [isHovered, setIsHovered] = useState<boolean>(false)
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    useEffect(() => {
        if(!isHovered) return;

        async function retrieveChallengePreview() {
            try{
                const response = await axiosClient.get(`/submission/${challengeId}`)
                console.log(response);
            } catch(e){
                console.error(e)
            }
        }
        retrieveChallengePreview();




    }, [isHovered])


    return (
        <>
            <div className="flex flex-wrap -m-4 animate-fadeIn"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
            >
                <div className="xl:w-1/3 md:w-1/2 p-4" >
                    <div className="border border-gray-200 p-6 rounded-lg hover:bg-amber-200 cursor-pointer transition duration-200 ease-in-out">
                        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                            {/*<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">*/}
                            {/*    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>*/}
                            {/*</svg>*/}
                        </div>
                        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{title}</h2>
                        <p className="animate-wiggle leading-relaxed text-base">{description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}