
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartProvider from './context/CartProvider'
import CartPage from './pages/CartPage'
import AuthProvider from './context/AuthProvider'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
         <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<CatalogPage />}
              />

              <Route
                path="/login"
                element={<LoginPage />}
              />

              <Route
                path="/cart"
                element={<CartPage />}
              />

              
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/checkout"
                  element={<h1 className="text-3xl font-bold">Checkout</h1>}
                />
              </Route>


              <Route path="/products/:id" element={<ProductPage />} />

              <Route
                path="*"
                element={<h1 className="text-3xl font-bold">Page not found</h1>}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
