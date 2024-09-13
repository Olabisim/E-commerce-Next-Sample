'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { products } from '@/utils/products'
import Link from 'next/link'
import { Goback } from '@/components/Goback'
import { useToast } from '@/hooks/use-toast'
import { productInterface } from '@/interfaces/main'






export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const { toast }:any = useToast()
  
  const product = products.find(p => p.id === parseInt(params.id))
  
  if (!product) {
    return <div>Product not found</div>
  }

  const addToCart = () => {

    const existingCartsItems:string | null | productInterface[] | any   = JSON.parse(window.localStorage && window.localStorage.getItem('carts')  || '""');

    let existingArrayCheck = existingCartsItems === "" ? [] : existingCartsItems;

    if(existingArrayCheck.find((x: productInterface) => x.id == product.id)) {
      
      toast({
        variant: "success",
        title: "product already added to cart",
        description: "successfully",
      })

      return 

    }

    window.localStorage && window.localStorage.setItem('carts', JSON.stringify([   { ...product, quantity}, ...existingArrayCheck,]));

    toast({
      variant: "success",
      title: "added product to cart",
      description: "successfully",
    })
    // In a real app, you'd update the cart state here
    console.log(`Added ${quantity} of ${product.name} to cart`)
    // router.push('/cart')
  }

  return (
    <>

    <span><Goback gobacklink='/' /></span>
    
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl mb-4">${product.price}</p>
        <p className="mb-4">{product.description}</p>N
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

    <div>
        <h1 className="text-3xl font-bold mb-4">Related products</h1>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
          products
          .filter((each) => (
            each.tag === product.tag && each.id != product.id
          ))
          .map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
            </Link>
          ))}
        </div>
    </div>
    </>
  )
}