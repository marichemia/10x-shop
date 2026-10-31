
import { useContext, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

function LoginPage() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const usernameError = username.trim()
      ? ''
      : 'Username is required'

    const passwordError = !password
      ? 'Password is required'
      : password.length < 6
        ? 'Password must be at least 6 characters'
        : ''

    setErrors({
      username: usernameError,
      password: passwordError,
    })

    if (usernameError || passwordError) return

    if (!auth) {
      throw new Error('AuthProvider is missing')
    }

    auth.login(username.trim())

    const destination =
      location.state?.from === '/checkout' ? '/checkout' : '/'

    navigate(destination)
  }

  return (
    <section className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold">Log In</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3 focus:outline-indigo-600"
          />

          {errors.username && (
            <p className="mt-1 text-sm text-red-600">
              {errors.username}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border p-3 focus:outline-indigo-600"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
        >
          Log In
        </button>
      </form>

      <Link
        to="/"
        className="mt-6 inline-block text-indigo-600 hover:underline"
      >
        ← Back to catalog
      </Link>
    </section>
  )
}

export default LoginPage
