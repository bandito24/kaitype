import React, {useEffect, useRef, useState} from "react";
import axiosClient from "@/services/axios-client.tsx";
import ChallengePreview from "@/components/browse/ChallengePreview.tsx";
import {useNavigate} from "react-router-dom";


type props = {
    title: string,
    challengeId: number,
    description: string,
    setTransitionOut: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChallengesOption({title, description, challengeId, setTransitionOut}: props) {
const [isHovered, setIsHovered] = useState<boolean>(false)
const [challengeContent, setChallengeContent] = useState<string[] | null>(null)
const [isDelayPassed, setIsDelayPassed] = useState(false);
const delayTimerRef = useRef<number>(0);
const navigate = useNavigate();

    const handleMouseEnter = () => {
        delayTimerRef.current = setTimeout(() => {
            setIsHovered(true);
            setIsDelayPassed(true);
        }, 700);
    };

    const handleMouseLeave = () => {
        // Clear the delay timer
        clearTimeout(delayTimerRef.current);
        setIsHovered(false);
        setIsDelayPassed(false);
    };
    function handleOnClick(){
        navigate(`/challenge/${challengeId}`);
    }

    useEffect(() => {
        // Run the async function when delay is passed and hovered over
        if (isHovered && isDelayPassed) {
            async function retrieveChallengePreview() {
                try {
                    const response = await axiosClient.get(`/submission/${challengeId}`);
                    if (response.status === 200) {
                        setChallengeContent(JSON.parse(response.data.content));
                    }
                } catch (e) {
                    console.error(e);
                }
            }
            retrieveChallengePreview();
        }
    }, [isHovered, isDelayPassed]);


    return (
            <div className="flex flex-wrap -m-4 animate-fadeIn relative"
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
                 onClick={handleOnClick}
            >
                <div className="xl:w-1/3 md:w-1/2 p-4" >
                    <div className="border border-gray-200 p-6 rounded-lg  cursor-pointer transition duration-200 ease-in-out hover:bg-amber-200">
                        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                            {/*<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">*/}
                            {/*    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>*/}
                            {/*</svg>*/}
                            {challengeContent && isHovered &&
                                <ChallengePreview
                                    challengeContent={challengeContent}
                                />
                            }
                        </div>
                        <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{title}</h2>
                        <p className="animate-wiggle leading-relaxed text-base">{description}</p>

                    </div>
                </div>

            </div>
    )
}