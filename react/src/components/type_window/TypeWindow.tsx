import ActiveString from "@/components/type_window/ActiveString.tsx";
import ActiveTyping from "@/components/type_window/ActiveTyping.tsx";
import {useEffect, useState} from "react";
import ProgressTimer from "@/components/type_window/ProgressTimer.tsx";
import {testObj} from "@/components/utilities/TestObj.tsx";

type ChallengeProgress = {
    currentIndex: number,
    totalIndex: number
}
type Challenge = {
    [key: number]: string
}

export default function TypeWindow() {
    const [progressString, setProgressString] = useState<string>('')
    const [challenge, setChallenge] = useState<Challenge>({})
    const [challengeProgression, setChallengeProgression] = useState<ChallengeProgress>({
        currentIndex: -1,
        totalIndex: 0
    })
    const [inProgress, setInProgress] = useState<boolean>(false)

    const stringObj = testObj;
    const challengeLength = Object.keys(stringObj).length

    useEffect(() => {
        setChallenge(stringObj)
        setChallengeProgression({currentIndex: 1, totalIndex: challengeLength})
        setInProgress(true)
    }, [challenge])


    return (
        <>
            <div className="m-auto mt-44 w-full flex flex-col items-center">
                {Object.keys(challenge).length > 0 &&
                    <>
                        <ProgressTimer
                            inProgress={inProgress}
                            challengeProgression={challengeProgression}
                        />
                        <ActiveString
                            progressString={progressString}
                        />
                        <ActiveTyping
                            setProgressString={setProgressString}
                            setChallengeProgression={setChallengeProgression}
                            challenge={challenge}
                            challengeProgression={challengeProgression}
                            setInProgress={setInProgress}

                        />
                    </>
                }

            </div>
        </>
    )
}