import {useEffect, useState} from "react";

type ChallengeProgress = {
    currentIndex: number,
    totalIndex: number
}


type Props = {
    inProgress: boolean
    challengeProgression: ChallengeProgress
    setTimer: React.Dispatch<React.SetStateAction<number>>
    timer: number
    completed: boolean
}


export default function ProgressTimer({inProgress, challengeProgression, timer, setTimer, completed}: Props) {
    const [progressValue, setProgressValue] = useState<number>(0)


    useEffect(() => {
        let timeoutId;
        setProgressValue(((challengeProgression.currentIndex - 1) / challengeProgression.totalIndex) * 100)


        if (inProgress && !completed) {
            timeoutId = setTimeout(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }
        // else {
        //     setProgressValue(100)
        //     setTimer(0);
        // }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [inProgress, timer]);


    return (
        <div className="mb-24">
            <p>Timer: {
                (timer >= 60 ? Math.floor(timer / 60) : 0)
                + ':' + timer % 60
            }
            </p>
            <progress value={progressValue.toString()} max="100"/>
        </div>
    )
}