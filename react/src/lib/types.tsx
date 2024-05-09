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
