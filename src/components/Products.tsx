import React from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/formatPrice';
import { Minus, Plus } from 'lucide-react';

interface ProductsProps {
  products: any[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function Products({ products, onIncrement, onDecrement, onRemove }: ProductsProps) {
  return (
    <div className="flex-1 col-span-2">
      <h1 className="text-2xl font-semibold mb-2">Shopping cart</h1>
      <p className="text-gray-600 mb-6">You have {products.length} item in your cart</p>
      
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="lg:flex md:flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Image
                src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
                alt={product.name}
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.desc}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-6 lg:mt-0 md:mt-0 mt-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onDecrement(product.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="">{product.quantity}</span>
                <button 
                  onClick={() => onIncrement(product.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="font-semibold">
                {formatPrice(product.price * product.quantity)}
              </span>
              <button 
                onClick={() => onRemove(product.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
) 