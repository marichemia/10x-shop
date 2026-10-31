
import type { Product } from '../../types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
