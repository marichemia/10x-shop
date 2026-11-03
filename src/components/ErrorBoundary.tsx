
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('React error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          className="mx-auto max-w-xl px-6 py-20 text-center"
        >
          <h1 className="text-3xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-4 text-slate-600">
            An unexpected error occurred. Please try again.
          </p>

          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white"
          >
            Return to Catalog
          </a>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
