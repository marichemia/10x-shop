
import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router'
import type { Product } from '../types/product'
import { CartContext } from '../context/CartContext'

function ProductPage() {
  const { id } = useParams()
  const cart = useContext(CartContext)

  const [product, setProduct] = useState<Product | null>(null)
  const [loadedId, setLoadedId] = useState('')
  const [error, setError] = useState('')

  const validId = id !== undefined && /^[1-9]\d*$/.test(id)

  useEffect(() => {
    if (!validId) return

    const controller = new AbortController()

    async function fetchProduct() {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${id}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'not-found'
              : 'Failed to load product'
          )
        }

        const data: Product = await response.json()

        if (!controller.signal.aborted) {
          setProduct(data)
          setError('')
          setLoadedId(id!)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : 'Unknown error'
          )
          setLoadedId(id!)
        }
      }
    }

    void fetchProduct()

    return () => controller.abort()
  }, [id, validId])
  
  if (!cart) {
      throw new Error('CartProvider is missing')
    }

  if (!validId || (loadedId === id && error === 'not-found')) {
    return (
      <section>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="text-indigo-600">
          Go to catalog
        </Link>
      </section>
    )
  }

  if (loadedId !== id) {
    return <p>Loading product...</p>
  }

  if (error) {
    return <p role="alert" className="text-red-600">{error}</p>
  }

  if (!product) {
    return <p>Product not found.</p>
  }

  return (
    <section>
      <Link to="/" className="text-indigo-600 hover:underline">
        ← Back to catalog
      </Link>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-xl bg-white p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-80 w-full object-contain"
          />
        </div>

        <div>
          <p className="text-sm text-slate-500">
            {product.category}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {product.title}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-indigo-600">
            ${product.price}
          </p>

          <p className="mt-4 text-slate-600">
            {product.description}
          </p>

          <p className="mt-4">
            {product.stock > 0
              ? `${product.stock} in stock`
              : 'Out of stock'}
          </p>

          <button
            type="button"
            onClick={() => cart.addItem(product)}
            disabled={
              product.stock === 0 ||
              (cart.items.find(
                (item) => item.productId === product.id
              )?.quantity ?? 0) >= product.stock
            }
            className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add to Cart
          </button>

          <p className="mt-3 text-sm text-slate-600">
            In cart: {
              cart.items.find(
                (item) => item.productId === product.id
              )?.quantity ?? 0
            }
          </p>

        </div>
      </div>
    </section>
  )
}

export default ProductPage
