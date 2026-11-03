
import { useContext, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate } from 'react-router'
import { CartContext } from '../context/CartContext'
import { discountedPrice, formatPrice } from '../utils/format'

function CheckoutPage() {
  const cart = useContext(CartContext)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
  })

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
  })

  const [orderTotal, setOrderTotal] = useState<number | null>(null)

  if (!cart) {
    throw new Error('CartProvider is missing')
  }

  
  const total = cart.items.reduce(
    (sum, item) =>
      sum +
      discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0
  )


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = {
      fullName: form.fullName.trim().length < 3
        ? 'Full name must be at least 3 characters'
        : '',
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ? 'Please enter a valid email address'
        : '',
      address: form.address.trim().length < 5
        ? 'Address must be at least 5 characters'
        : '',
      city: !form.city.trim()
        ? 'City is required'
        : '',
    }

    setErrors(validationErrors)

    if (Object.values(validationErrors).some(Boolean)) {
      return
    }

    setOrderTotal(total)
    cart!.clearCart()
  }

  // Show confirmation before checking the empty cart.
  if (orderTotal !== null) {
    return (
      <section className="mx-auto max-w-lg rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-green-600">
          Thank you!
        </h1>

        <p className="mt-4 text-lg">
          Your order has been placed.
        </p>

        <p className="mt-4 font-semibold">
          Order total: {formatPrice(orderTotal)}
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </section>
    )
  }

  if (cart.items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-xl bg-white p-6 shadow-sm md:col-span-2"
        >
          <h2 className="text-xl font-semibold">
            Shipping Information
          </h2>

          <div>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              value={form.fullName}
              onChange={(e) =>
                setForm({ ...form, fullName: e.target.value })
              }
              className="mt-2 w-full rounded-lg border p-3"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="mt-2 w-full rounded-lg border p-3"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
              className="mt-2 w-full rounded-lg border p-3"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="mt-2 w-full rounded-lg border p-3"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">
                {errors.city}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
          >
            Place Order
          </button>
        </form>

        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 flex justify-between">
            <span>Total</span>
            <span className="font-bold">
              {formatPrice(total)}
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default CheckoutPage
