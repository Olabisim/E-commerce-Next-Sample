'use client'

import { useState } from 'react'
import Link from 'next/link'
import { productInterface } from '@/interfaces/main'
import { useRouter } from 'next/navigation'
import { Goback } from '@/components/Goback'
import { useToast } from '@/hooks/use-toast'

// In a real app, this would come from a global state or context
const initialCartItems = [
  { id: 1, name: 'Basic Tee', price: 35, quantity: 2 },
  { id: 2, name: 'Fancy Pants', price: 60, quantity: 1 },
]

export default function CartPage() {


  const router = useRouter()

  const existingCartsItems:string | null | productInterface[] | any   = JSON.parse(localStorage && localStorage.getItem('carts')  || '""');
  
  
  const [cartItems, setCartItems] = useState(existingCartsItems)
  
  const { toast }:any = useToast()

  

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item:productInterface) => item.id !== id))
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map((item:productInterface) => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const total = cartItems.reduce((sum:number, item:productInterface) => sum + item.price *  item.quantity, 0)

  const handleProceedtoCheckout = () => {
    
    localStorage && localStorage.setItem('carts', JSON.stringify([...cartItems]));
    router.push('/checkout')
  }

  const handleResetCart = () => {
    
    localStorage && localStorage.setItem('carts', JSON.stringify([]));
    setCartItems([])
    toast({
      variant: "success",
      title: "cart cleared",
      description: "successfully",
    })
    router.push('/')
  }

  const handleSaveCart = () => {
    localStorage && localStorage.setItem('carts', JSON.stringify([...cartItems]));
    toast({
      variant: "success",
      title: "Cart saved add more carts",
      description: "successfully",
    })

  }

  return (
    <div>

      
    <span><Goback gobacklink='/' /></span>


      <div className="flex justify-between items-center">

      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      <div>
        {
          cartItems.length != 0 
          &&
            <>
            <button onClick={handleResetCart} className="mx-2 mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Clear
            </button>
            <button onClick={handleSaveCart} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Save
            </button>
            </>
        }
      </div>

      </div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item:productInterface) => (
              <li key={item.id} className="py-4 flex">
                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">${item.price}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="border rounded px-2 py-1 w-16 mr-4"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-xl font-bold">Total: ${total}</p>
            <button onClick={handleProceedtoCheckout} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}