import Link from 'next/link'

const products = [
  { id: 1, name: 'Basic Tee', price: 35, image: '../top.jpg' },
  { id: 2, name: 'Fancy Pants', price: 60, image: '../top.jpg' },
  { id: 3, name: 'Cool Hoodie', price: 75, image: '../top.jpg' },
  // Add more products as needed
]

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
  )
}