
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl py-20 text-center">
      <h1 className="text-6xl font-bold text-indigo-600">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page not found
      </h2>

      <p className="mt-4 text-slate-600">
        Sorry, we couldn't find the page you're looking for.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
      >
        Back to Catalog
      </Link>
    </section>
  )
}

export default NotFoundPage
