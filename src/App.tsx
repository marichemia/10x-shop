
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'
import CatalogPage from './pages/CatalogPage'
import ProductPage from './pages/ProductPage'
import CartProvider from './context/CartProvider'
import CartPage from './pages/CartPage'
import AuthProvider from './context/AuthProvider'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './routes/ProtectedRoute'
import CheckoutPage from './pages/CheckoutPage'
import ErrorBoundary from './components/ErrorBoundary'
import NotFoundPage from './pages/NotFoundPage'


function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <CartProvider>
          <AuthProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/products/:id" element={<ProductPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </CartProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}


export default App
