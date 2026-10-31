
import { Link } from 'react-router'
import type { Product } from '../../types/product'

interface ProductCardProps {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
        className="h-40 w-full object-contain"
      />

      <h2 className="mt-3 font-semibold">
        {product.title}
      </h2>

      <p className="mt-2 text-indigo-600">
        ${product.price}
      </p>
    </Link>
  )
}

export default ProductCard
