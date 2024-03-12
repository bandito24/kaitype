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


    // intervalId = setInterval(() => setTimer(timer + 1), 10);
    useEffect(() => {
        setProgressValue(((challengeProgression.currentIndex - 1) / challengeProgression.totalIndex) * 100)
        if (inProgress && !completed) {
            const intervalId = setInterval(() => {
                setTimer(currentTimer => currentTimer + 1);
            }, 10);
            return () => clearInterval(intervalId);
        }
    }, [inProgress, completed]);

    const minutes = Math.floor(timer / 6000);
    const seconds = Math.floor((timer % 6000) / 100);
    const milliseconds = timer % 100;


    return (
        <div className="mb-24">
            <p>Timer: {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")
            }
            </p>
            <progress value={progressValue.toString()} max="100"/>
        </div>
    )
}