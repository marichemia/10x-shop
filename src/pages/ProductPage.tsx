
import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router'
import type { Product, ProductsResponse } from '../types/product'
import ProductGrid from '../components/product/ProductGrid'
import { CartContext } from '../context/CartContext'
import { discountedPrice, formatPrice } from '../utils/format'


function ProductPage() {
  const { id } = useParams()
  const cart = useContext(CartContext)

  const [product, setProduct] = useState<Product | null>(null)
  const [loadedId, setLoadedId] = useState('')
  const [error, setError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [related, setRelated] = useState<{
  productId: number
  products: Product[]
} | null>(null)

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

  useEffect(() => {
  if (!product || loadedId !== id) return

  const currentProduct = product

  const controller = new AbortController()

  async function fetchRelated() {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${encodeURIComponent(currentProduct.category)}?limit=5`,
        { signal: controller.signal }
      )

      if (!response.ok) {
        throw new Error('Failed to load related products')
      }

      const data: ProductsResponse = await response.json()

      if (!controller.signal.aborted) {
        setRelated({
          productId: currentProduct.id,
          products: data.products
            .filter((item) => item.id !== currentProduct.id)
            .slice(0, 4)
        })
      }
    } catch {
      if (!controller.signal.aborted) {
        setRelated({
          productId: currentProduct.id,
          products: []
        })
      }
    }
  }

  void fetchRelated()

  return () => controller.abort()
}, [id, loadedId, product])
  
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

  
  const inCart =
    cart.items.find((item) => item.productId === product.id)?.quantity ?? 0

  const remainingStock = Math.max(0, product.stock - inCart)

  const selectedQuantity = Math.min(quantity, remainingStock)


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

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold text-indigo-600">
              {formatPrice(
                discountedPrice(product.price, product.discountPercentage)
              )}
            </span>

            {product.discountPercentage >= 1 && (
              <>
                <span className="text-slate-400 line-through">
                  {formatPrice(product.price)}
                </span>

                <span className="font-medium text-green-600">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>


          <p className="mt-4 text-slate-600">
            {product.description}
          </p>

          <p className="mt-4">
            {product.stock > 0
              ? `${product.stock} in stock`
              : 'Out of stock'}
          </p>

          
  <div className="mt-6 space-y-4">
    {remainingStock > 0 && (
      <div className="flex items-center gap-4">
        <span className="font-medium">Quantity:</span>

        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={selectedQuantity <= 1}
          className="rounded border px-3 py-2 disabled:opacity-40"
        >
          −
        </button>

        <span className="min-w-6 text-center font-semibold">
          {selectedQuantity}
        </span>

        <button
          type="button"
          onClick={() =>
            setQuantity((q) => Math.min(remainingStock, q + 1))
          }
          disabled={selectedQuantity >= remainingStock}
          className="rounded border px-3 py-2 disabled:opacity-40"
        >
          +
        </button>
      </div>
  )}

  <button
    type="button"
    onClick={() => {
      cart.addItem(product, selectedQuantity)
      setQuantity(1)
    }}
    disabled={remainingStock === 0}
    className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
  >
    {product.stock === 0
      ? 'Out of stock'
      : remainingStock === 0
        ? 'Stock limit reached'
        : `Add ${selectedQuantity} to Cart`}
  </button>

  {inCart > 0 && (
    <p className="text-sm text-slate-500">
      In cart: {inCart}
    </p>
  )}
</div>


          <p className="mt-3 text-sm text-slate-600">
            In cart: {
              cart.items.find(
                (item) => item.productId === product.id
              )?.quantity ?? 0
            }
          </p>

        </div>
      </div>
      {related?.productId === product.id &&
        related.products.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">
            Related Products
          </h2>

          <ProductGrid products={related.products} />
        </div>
      )}
    </section>
  )
}

export default ProductPage
