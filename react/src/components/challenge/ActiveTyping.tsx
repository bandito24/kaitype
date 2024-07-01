import {useEffect, useMemo, useReducer, useRef, useState} from 'react';

import ChallengeTool from '@/components/utilities/ChallengeTool.tsx'
import {useChallengeContext} from '@/components/challenge/ChallengeContext.tsx'
import ChallengeContent from '@/components/challenge/ChallengeContent.tsx'
import {successReducer} from '@/hooks/challengeReducers.tsx';
import CurrentAttemptCompetitor from '@/components/challenge/CurrentAttemptCompetitor.tsx'
import Keyboard from '@/components/challenge/Keyboard.tsx'

export default function ActiveTyping() {
  const [activeString, setActiveString] = useState<string>('')
  const [progressString, setProgressString] = useState<string>('')
  const [lastKeyInput, setLastKeyInput] = useState<string | null>()

  const challengeTool = new ChallengeTool()
  const {challenge, setChallenge} = useChallengeContext()
  if (!challenge) return
  let errorIndex: number
  const inputRef = useRef<HTMLInputElement>(null)



  const challengeContent = challenge.challengeContent

  const challengeProgress = useMemo(
    () => challenge?.challengeProgress,
    [challenge?.challengeProgress],
  )


  const encode = challengeTool.encodeHtmlEntities
  const [successState, dispatchSuccess] = useReducer(successReducer, {stringSuccessIndex: null, initialErrorIndex: null, totalCorrectCount: 0, progressState: null})




  useEffect(() => {
    console.log(challengeContent[challengeProgress.currentIndex].length)
    setActiveString(challengeContent[challengeProgress.currentIndex].trim())
    setProgressString(challengeContent[challengeProgress.currentIndex].trim())
  }, [challengeProgress])

  function handleKeyDown(e) {
    setLastKeyInput(e.key)
  }
  function progressLevel(){
    if(challenge.challengeProgress.currentIndex === challenge.challengeProgress.totalIndex){
      setChallenge(prev => ({
      ...prev,
      completed: true,
      inProgress: false
      }));
      return
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setLastKeyInput('')
    dispatchSuccess({type: 'progressLevel'})
    setChallenge(prev => ({
      ...prev,
      challengeProgress: {
        ...prev.challengeProgress,
        currentIndex: prev.challengeProgress.currentIndex + 1
      }
    }))
  }

  const handleChange = (event) => {
    const {value: inputValue} = event.target

    const matchIndex = activeString.indexOf(inputValue)
    if (matchIndex !== -1) {
      setProgressString(challengeTool.sliceStringStatus(activeString, 0, inputValue.length, 'success'))
      if (lastKeyInput !== 'Backspace'){
        dispatchSuccess({type: 'correct', payload: inputValue.length})
      } else {
        dispatchSuccess({type: 'resetErrorIndex'})
      }

    } else {

      if (!successState.initialErrorIndex) {
        errorIndex = inputValue.length === 1 ? 0 : inputValue.length - 1
        dispatchSuccess({type: 'incorrect', payload: errorIndex})
      } else errorIndex = successState.initialErrorIndex

      const startSubstring = activeString.substring(0, errorIndex)
      const middleSubstring = activeString.substring(errorIndex, inputValue.length)
      const endSubstring = activeString.substring(inputValue.length)
      const startStatus = errorIndex === 1 ? 'error-highlight' : 'highlight'

      const highlightedStart =`<mark class=${startStatus}>${encode(startSubstring)}</mark>`
      const highlightedError = `<mark class='error-highlight'>${encode(middleSubstring)}</mark>`

      setProgressString(highlightedStart + highlightedError + endSubstring)
    }
  }

  return (
      <div className="relative m-auto mt-44 flex w-full flex-col items-center">
      <CurrentAttemptCompetitor
        progressState={successState.progressState}
      />
      <ChallengeContent progressString={progressString} />
      <div className='mt-14 flex w-full justify-center'>
        <input
          className='w-full rounded p-4 outline outline-2 outline-offset-2 outline-blue-500'
          type='text'
          onInput={handleChange}
          ref={inputRef}
          // onPaste={handleCopyPaste}
          // value={inputValue}
          disabled={challenge.completed}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
      <Keyboard
        lastKeyInput={lastKeyInput}
        inputValue={inputRef.current?.value}
        activeString={activeString}
        progressLevel={progressLevel}
      />
    </div>
  )
}
