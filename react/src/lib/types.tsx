export type UserType = {
  username: string
  id: number
}

export type Comment = {
  id: number
  content: string
  username: string
  created_at: string
  has_response: boolean | null
  edited: boolean | null
  user_id: number
  votes: number
  parent_id?: number | null
  user: {id: number; username: string}
}

export type ErrorObject =
  | {
      [key: string]: Array<string> // Here, 'key' is a string representing the error field name, and 'any[]' is an array of variable values.
    }
  | string
  | string[]

export type RetrievedCategory = {
  id: number
  name: string
  slug: string
  submissions_count: number
}

export type PreviousCompetitorType = {
  user_id: number
  formatted_time: string
  milliseconds: number
  username: string
  merit: number
  currentPosition?: number
}

export type StateContextType = {
  Provider: any
  user: UserType | null
  token: string | null
  setUser: (user: UserType | null) => void
  setToken: (token: string | null) => void
}

export type PastVote = {
  challenge_comment_id: number
  direction: number
}

export type CategoryChallenge = {
  name: string
  id: number
  description: string
}
//
export type CategoryChallengeResponse = {
  categoryName: string
  challenges: CategoryChallenge[]
  categoryCount: number
}
export type PageObj = {
  currentPage: number
  lastPage: number
}

export type Selection = {
  id: number
  name: string
  slug?: string
  submissions_count?: number
  description?: string
  userProgress?: number
  position?: number
}

export type Option = {
  view: 'categories' | 'challenges'
  title: string
  description: string
  selections: Selection[]
  action: (navigate: any, param: string | number) => any
}

export type OptionsContextType = {
  options: Option | null
  setOptions: React.Dispatch<React.SetStateAction<Option | null>>
}

export type Challenge = {
  challengeContent: string[]
  currentWeightedLevelKey: number
  allWeightedLevels: {[key: string]: number}
  challengeProgress: {currentIndex: number; totalIndex: number}
  inProgress: boolean
  completed: boolean
  name: string
  id: number
}
export type ChallengeContextType = {
  challenge: Challenge
  // setChallenge: (challenge: Challenge | null) => void
  setChallenge: React.Dispatch<React.SetStateAction<Challenge>>
}
