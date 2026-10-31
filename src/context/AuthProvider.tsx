
import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [username, setUsername] = useState<string | null>(null)

  function login(name: string) {
    setUsername(name)
  }

  function logout() {
    setUsername(null)
  }

  return (
    <AuthContext.Provider
      value={{
        username,
        isLoggedIn: username !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
