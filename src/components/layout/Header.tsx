
import { Link, NavLink } from 'react-router'

function Header() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          10X Shop
        </Link>

        <div className="flex gap-5">
          <NavLink to="/" end>Catalog</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/login">Log in</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header
