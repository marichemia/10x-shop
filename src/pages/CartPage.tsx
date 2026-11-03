
import { useContext } from 'react'
import { Link } from 'react-router'
import { CartContext } from '../context/CartContext'
import { discountedPrice, formatPrice } from '../utils/format'

function CartPage() {
  const cart = useContext(CartContext)

  if (!cart) {
    throw new Error('CartProvider is missing')
  }

  
  const subtotal = cart.items.reduce(
    (total, item) =>
      total +
      discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0
  )


  if (cart.items.length === 0) {
    return (
      <section>
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="mt-6">Your cart is empty.</p>

        <Link to="/" className="mt-4 inline-block text-indigo-600">
          Browse products
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">Your Cart</h1>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-24 w-24 object-contain"
              />

              <div className="min-w-0 flex-1">
                <Link
                  to={`/products/${item.productId}`}
                  className="font-semibold hover:text-indigo-600"
                >
                  {item.title}
                </Link>

                <p className="mt-2 text-slate-600">
                  {formatPrice(
                    discountedPrice(item.price, item.discountPercentage)
                  )}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      cart.setQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="rounded border px-3 py-1 disabled:opacity-40"
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      cart.setQuantity(item.productId, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.stock}
                    className="rounded border px-3 py-1 disabled:opacity-40"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => cart.removeItem(item.productId)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <p className="font-semibold">
                {formatPrice(
                  discountedPrice(item.price, item.discountPercentage) * item.quantity
                )}
              </p>

            </div>
          ))}

          <button
            type="button"
            onClick={() => cart.clearCart()}
            className="text-sm text-red-600 hover:underline"
          >
            Clear cart
          </button>
        </div>

        <div className="h-fit rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-6 flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 font-bold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-lg bg-indigo-600 px-4 py-3 text-center text-white hover:bg-indigo-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CartPage
