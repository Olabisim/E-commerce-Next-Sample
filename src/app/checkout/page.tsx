'use client'

import { useState } from 'react'

export default function CheckoutPage() {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd process the order here
    console.log('Order placed with address:', address)
    alert('Order placed successfully!')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="street" className="block mb-2 font-medium">Street Address</label>
          <input
            type="text"
            id="street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-2 font-medium">City</label>
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block mb-2 font-medium">State</label>
          <input
            type="text"
            id="state"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zip" className="block mb-2 font-medium">ZIP Code</label>
          <input
            type="text"
            id="zip"
            value={address.zip}
            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Place Order
        </button>
      </form>
    </div>
  )
}