import {createContext, useContext, ReactNode, useState} from 'react'
import {OptionsContextType, Option} from '@/lib/types.tsx'

const OptionsContext = createContext<OptionsContextType | undefined>(undefined)

export const useOptionsContext = () => {
  const context = useContext(OptionsContext)
  if (!context) {
    throw new Error('useOptionsContext must be used within an OptionsProvider')
  }
  return context
}

type OptionsProviderProps = {
  children: ReactNode
}

export const OptionsProvider = ({children}: OptionsProviderProps) => {
  const [options, setOptions] = useState<Option | null>(null)

  return (
    <OptionsContext.Provider value={{options, setOptions}}>
      {children}
    </OptionsContext.Provider>
  )
}
