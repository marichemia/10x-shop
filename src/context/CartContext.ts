
import { createContext } from 'react'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  setQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null)
