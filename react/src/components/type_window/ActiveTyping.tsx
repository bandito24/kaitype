import React, {useEffect, useState} from "react";
import {encodeHtmlEntities} from "@/lib/helperFunctions.tsx";
import {comment} from "postcss";


type ChallengeProgress = {
    currentIndex: number,
    totalIndex: number
}
type Challenge = {
    [key: number]: string
}

type ActiveTypingProps = {
    setProgressString: React.Dispatch<React.SetStateAction<string>>,
    setChallengeProgression: React.Dispatch<React.SetStateAction<ChallengeProgress>>
    setInProgress: React.Dispatch<React.SetStateAction<boolean>>
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    setActiveString: React.Dispatch<React.SetStateAction<string>>,
    activeString: string,
    challenge: Challenge
    challengeProgression: ChallengeProgress
    inputValue: string
    setCompleted: React.Dispatch<React.SetStateAction<boolean>>
    completed: boolean
}

export default function ActiveTyping({
                                         setProgressString,
                                         setChallengeProgression,
                                         setInProgress,
                                         challenge,
                                         challengeProgression,
                                         activeString,
                                         setActiveString,
                                         inputValue,
                                         setInputValue,
                                         setCompleted,
                                         completed
                                     }: ActiveTypingProps) {
    // const [activeString, setActiveString] = useState<string>('');
    const [initialErrorIndex, setInitialErrorIndex] = useState<number>(-1)


    useEffect(() => {
        setProgressString(encodeHtmlEntities(challenge[challengeProgression.currentIndex]))
        setActiveString(challenge[challengeProgression.currentIndex])
    }, [challengeProgression])

    // const handleCopyPaste = (event) => {
    //     // event.preventDefault();
    //     // alert('No cheating')
    // };

    const handleChange = (event) => {
        if (completed) return
        const userInput = event.target.value
        setInputValue(userInput)

        if (userInput === activeString.substring(0, userInput.length)) {
            setInitialErrorIndex(-1)
            const matchedString = `<mark class="highlight">${encodeHtmlEntities(userInput)}</mark>`;
            const remainingString = encodeHtmlEntities(activeString.substring(userInput.length));
            setProgressString(matchedString + remainingString);
            if (userInput.length === activeString.length) {
                if (challengeProgression.currentIndex === challengeProgression.totalIndex - 1) {
                    setInProgress(false)
                    // setTimeout(() => {
                    setCompleted(true)
                    // setChallengeProgression(prev => ({
                    //     ...prev, currentIndex: 1
                    // }))
                    // setInputValue('')
                    // }, 200)

                } else {
                    setChallengeProgression(prev => ({
                        ...prev, currentIndex: prev.currentIndex + 1
                    }))
                    setInputValue('')
                }
            }
        } else {
            // Error scenario
            const errorIndex = initialErrorIndex === -1 ? userInput.length - 1 : initialErrorIndex;
            if (initialErrorIndex === -1) {
                setInitialErrorIndex(userInput.length - 1);
            }

            const errorFlag = `<mark class="error-highlight">${encodeHtmlEntities(activeString.substring(errorIndex, userInput.length))}</mark>`;


            setProgressString(`<mark class="highlight">${encodeHtmlEntities(activeString.substring(0, errorIndex))}</mark>` + errorFlag + encodeHtmlEntities(activeString.substring(userInput.length)));
        }
    }


    return (
        <div className="flex justify-center mt-14 w-full">
            <input className="outline-2 outline outline-offset-2 outline-blue-500 w-full p-4 rounded" type="text"
                   onChange={handleChange}
                // onPaste={handleCopyPaste}
                   value={inputValue}
                   disabled={completed}
            />
        </div>
    )
}