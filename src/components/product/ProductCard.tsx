
import { Link } from 'react-router'
import type { Product } from '../../types/product'
import { discountedPrice, formatPrice } from '../../utils/format'

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

      
      <div className="mt-2 flex flex-wrap items-center gap-2">
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

    </Link>
  )
}

export default ProductCard
