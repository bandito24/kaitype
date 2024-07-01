import {createContext, ReactNode, useContext, useState} from 'react'
import {Challenge, ChallengeContextType} from '@/lib/types.tsx'


const initial = {
  challengeContent: [],
  currentWeightedLevelKey: 0,
  allWeightedLevels: {0: 0},
  challengeProgress: {currentIndex: 0, totalIndex: 0},
  inProgress: false,
  completed: false,
  name: 'false',
  id: 0,
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
)

export const useChallengeContext = () => {
  const context = useContext(ChallengeContext)
  if (!context) {
    throw new Error('useBrowseContext must be used within an ChallengeProvider')
  }
  return context
}

type ChallengeProviderProps = {
  children: ReactNode
}

export const ChallengeProvider = ({children}: ChallengeProviderProps) => {
  const [challenge, setChallenge] = useState<Challenge>(initial)
  return (
    <ChallengeContext.Provider value={{challenge, setChallenge}}>
      {children}
    </ChallengeContext.Provider>
  )
}
