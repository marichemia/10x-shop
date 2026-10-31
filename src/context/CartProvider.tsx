
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types/product'
import type { CartItem } from '../types/cart'
import { CartContext } from './CartContext'

interface CartProviderProps {
  children: ReactNode
}

function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(product: Product) {
    setItems((currentItems) => {
      if (product.stock <= 0) return currentItems

      const existing = currentItems.find(
        (item) => item.productId === product.id
      )

      if (existing) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.stock),
              }
            : item
        )
      }

      return [
        ...currentItems,
        {
          productId: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          quantity: 1,
        },
      ]
    })
  }

  function removeItem(productId: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId)
    )
  }

  function setQuantity(productId: number, quantity: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(quantity, item.stock)),
            }
          : item
      )
    )
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
