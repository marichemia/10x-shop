
import { createContext } from 'react'

export interface AuthContextType {
  username: string | null
  isLoggedIn: boolean
  login: (username: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
