
import { Outlet } from 'react-router'
import Header from './Header'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t bg-white py-4 text-center text-sm text-slate-500">
        © 2026 10X Shop
      </footer>
    </div>
  )
}

export default Layout
