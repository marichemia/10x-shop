
import { useEffect, useState } from 'react'
import type { Product, ProductsResponse } from '../types/product'
import ProductCard from '../components/product/ProductCard'

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      try {
        const response = await fetch(
          'https://dummyjson.com/products?limit=12&skip=0',
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data: ProductsResponse = await response.json()
        setProducts(data.products)
      } catch {
        if (!controller.signal.aborted) {
          setError('Something went wrong while loading products.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void fetchProducts()

    return () => controller.abort()
  }, [])

  return (
    <section>
      <h1 className="text-3xl font-bold">Product Catalog</h1>

      <p className="mt-4 text-slate-600">
        Browse our collection of products.
      </p>

      {loading && <p className="mt-6">Loading products...</p>}

      {error && <p role="alert" className="mt-6 text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="mt-6">No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

export default CatalogPage
