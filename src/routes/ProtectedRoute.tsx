
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { AuthContext } from '../context/AuthContext'

function ProtectedRoute() {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('AuthProvider is missing')
  }

  if (!auth.isLoggedIn) {
    return (
      <Navigate
        to="/login"
        state={{ from: '/checkout' }}
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
