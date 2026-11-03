
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

  
  function addItem(product: Product, quantity = 1) {
    if (product.stock <= 0 || quantity < 1) return

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === product.id
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.stock,
                  item.quantity + quantity
                ),
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
          quantity: Math.min(quantity, product.stock),
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
