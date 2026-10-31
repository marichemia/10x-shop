
import { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { CartContext } from '../../context/CartContext'
import { AuthContext } from '../../context/AuthContext'

function Header() {
  const cart = useContext(CartContext)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  if (!cart || !auth) {
    throw new Error('Provider is missing')
  }

  const cartCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  function handleLogout() {
    if (!auth) return

    auth.logout()
    navigate('/')
  }

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          10X Shop
        </Link>

        <div className="flex flex-wrap items-center gap-5">
          <NavLink to="/" end>
            Catalog
          </NavLink>

          <NavLink to="/cart" className="flex items-center gap-2">
            Cart

            {cartCount > 0 && (
              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </NavLink>

          {auth.isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hover:text-indigo-600"
            >
              Log out
            </button>
          ) : (
            <NavLink to="/login">
              Log in
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
