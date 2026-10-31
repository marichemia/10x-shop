
export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  category: string
  rating: number
  stock: number
  thumbnail: string
  images: string[]
  brand?: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
