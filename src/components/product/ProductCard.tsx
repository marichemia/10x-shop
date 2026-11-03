
import { useContext } from 'react'
import { Link } from 'react-router'
import type { Product } from '../../types/product'
import { CartContext } from '../../context/CartContext'
import { discountedPrice, formatPrice } from '../../utils/format'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const cart = useContext(CartContext)

  if (!cart) {
    throw new Error('CartProvider is missing')
  }

  const inCart =
    cart.items.find((item) => item.productId === product.id)?.quantity ?? 0

  const atLimit = product.stock === 0 || inCart >= product.stock

  return (
    <article className="flex h-full flex-col rounded-xl bg-white p-4 shadow-sm">
      <Link to={`/products/${product.id}`} className="group">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-48 w-full object-contain"
        />

        <h2 className="mt-4 font-semibold group-hover:text-indigo-600">
          {product.title}
        </h2>
      </Link>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-indigo-600">
            {formatPrice(
              discountedPrice(product.price, product.discountPercentage)
            )}
          </span>

          {product.discountPercentage >= 1 && (
            <>
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.price)}
              </span>

              <span className="text-xs font-medium text-green-600">
                -{Math.round(product.discountPercentage)}%
              </span>
            </>
          )}
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {product.stock > 0
            ? `${product.stock} in stock`
            : 'Out of stock'}
        </p>

        <button
          type="button"
          onClick={() => cart.addItem(product)}
          disabled={atLimit}
          className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {product.stock === 0
            ? 'Out of stock'
            : atLimit
              ? 'Stock limit reached'
              : 'Add to Cart'}
        </button>

        {inCart > 0 && (
          <p className="mt-2 text-center text-sm text-slate-500">
            In cart: {inCart}
          </p>
        )}
      </div>
    </article>
  )
}

export default ProductCard
