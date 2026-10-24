
import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/layout/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<h1 className="text-3xl font-bold">Catalog</h1>}
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

          <Route
            path="/products/:id"
            element={<h1 className="text-3xl font-bold">Product Details</h1>}
          />

          <Route
            path="*"
            element={<h1 className="text-3xl font-bold">Page not found</h1>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
