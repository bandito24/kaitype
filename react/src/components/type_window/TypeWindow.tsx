import ActiveString from "@/components/type_window/ActiveString.tsx";
import ActiveTyping from "@/components/type_window/ActiveTyping.tsx";
import {useEffect, useMemo, useState} from "react";
import ProgressTimer from "@/components/type_window/ProgressTimer.tsx";
import Keyboard from "@/components/type_window/Keyboard.tsx";
import ChallengeCompletedResults from "@/components/type_window/ChallengeCompletedResults.tsx";
import {useStateContext} from "../../../contexts/contextProvider.tsx";

type ChallengeProgress = {
    currentIndex: number,
    totalIndex: number
}
type Challenge = string[];

type ChallengeMetadata = {
    title: string,
    description: string,
    content: string, //json
    id: number,
}


type Props = {
    challengeMetadata: ChallengeMetadata
}

export default function TypeWindow({challengeMetadata}: Props) {
    const [timer, setTimer] = useState(0);
    const [completed, setCompleted] = useState<boolean>(false)
    const [progressString, setProgressString] = useState<string>('')
    const [challenge, setChallenge] = useState<Challenge>([])
    const [challengeProgression, setChallengeProgression] = useState<ChallengeProgress>({
        currentIndex: -1,
        totalIndex: 0
    })
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState('')
    const [activeString, setActiveString] = useState<string>('');
    const [userId, setUserId] = useState<number>(-1)
    const {user} = useStateContext();


    function formatChallengeContentJson(challengeJson){
        return JSON.parse(challengeJson)
            .map(val => val.trim())
            .filter(val => val.length && val.substring(0,2) !== '//')
    }
    const formatJson = useMemo(()=> {
        return formatChallengeContentJson(challengeMetadata.content)
    }, [challenge])



    useEffect(() => {
        if(user?.id){
            setUserId(user.id)
        }
        const challengeContent = formatJson;
        const challengeLength = challengeContent.length
        setChallenge(challengeContent)
        setChallengeProgression({currentIndex: 0, totalIndex: challengeLength})
        setInProgress(true)
    }, [challengeMetadata])


    return (
        <>
            <div className="m-auto mt-44 w-full flex flex-col items-center relative">
                {Object.keys(challenge).length > 0 &&
                    <>
                        <ProgressTimer
                            inProgress={inProgress}
                            challengeProgression={challengeProgression}
                            setTimer={setTimer}
                            timer={timer}
                            completed={completed}
                        />
                        <ActiveString
                            progressString={progressString}
                        />
                        <ActiveTyping
                            setProgressString={setProgressString}
                            setChallengeProgression={setChallengeProgression}
                            challenge={challenge}
                            challengeProgression={challengeProgression}
                            activeString={activeString}
                            setActiveString={setActiveString}
                            setInProgress={setInProgress}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            setCompleted={setCompleted}
                            completed={completed}
                        />
                        {completed &&
                            <ChallengeCompletedResults
                                timer={timer}
                                userId={userId}
                                challengeId={challengeMetadata.id}
                            />
                        }
                    </>
                }

            </div>
            <Keyboard
            activeString={activeString}
            inputValue={inputValue}
            />

        </>
    )
}