'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const products = [
  { id: 1, name: 'Basic Tee', price: 35, image: '../../top.JPG', description: 'A comfortable and versatile tee for everyday wear.' },
  { id: 2, name: 'Fancy Pants', price: 60, image: '../../top.JPG', description: 'Elevate your style with these trendy pants.' },
  { id: 3, name: 'Cool Hoodie', price: 75, image: '../../top.JPG', description: 'Stay warm and look cool with this awesome hoodie.' },
  // Add more products as needed
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  
  const product = products.find(p => p.id === parseInt(params.id))
  
  if (!product) {
    return <div>Product not found</div>
  }

  const addToCart = () => {
    // In a real app, you'd update the cart state here
    console.log(`Added ${quantity} of ${product.name} to cart`)
    router.push('/cart')
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl mb-4">${product.price}</p>
        <p className="mb-4">{product.description}</p>
        <div className="flex items-center gap-4 mb-4">
          <label htmlFor="quantity" className="font-medium">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-16"
          />
        </div>
        <button
          onClick={addToCart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}