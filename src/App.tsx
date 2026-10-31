
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartProvider from './context/CartProvider'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<CatalogPage />}
            />

            <Route
              path="/login"
              element={<h1 className="text-3xl font-bold">Login</h1>}
            />

            <Route
              path="/cart"
              element={<h1 className="text-3xl font-bold">Your Cart</h1>}
            />

            <Route
              path="/checkout"
              element={<h1 className="text-3xl font-bold">Checkout</h1>}
            />

            <Route path="/products/:id" element={<ProductPage />} />

            <Route
              path="*"
              element={<h1 className="text-3xl font-bold">Page not found</h1>}
            />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
