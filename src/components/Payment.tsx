"use client"

import React, { useEffect, useState } from 'react'
import Products from '@/components/Products'
import Checkout from '@/components/Checkout'

export default function Payment() {
  const [products, setProducts] = useState<any[]>([])
  
  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const [productsResponse, pricingResponse] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/pricing'),
    ])

    if (!productsResponse.ok || !pricingResponse.ok) {
      throw new Error('API error occurred');
    }

    const productsData = await productsResponse.json();
    const pricingData = await pricingResponse.json();

    const mergedProducts = mergeProductsWithPricing(productsData, pricingData);
    setProducts(mergedProducts);
  }

  const mergeProductsWithPricing = (products: any[], pricing: any[]) => {
    const priceMap = new Map(
      pricing.map(item => [item.id, item.price])
    );

    return products.map(product => ({
      ...product,
      price: priceMap.get(product.id) ?? null,
      quantity: 1
    }));
  };

  // Yangi funksiyalar
  const incrementQuantity = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, quantity: product.quantity + 1 }
        : product
    ));
  };

  const decrementQuantity = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    ));
  };

  const removeProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };
  
  return (
    <div className="flex gap-6 p-6 max-w-7xl mx-auto relative">
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6">
      <Products 
        products={products}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        onRemove={removeProduct}
      />
      <Checkout products={products}/>
      </div>
    </div>
  )
}
