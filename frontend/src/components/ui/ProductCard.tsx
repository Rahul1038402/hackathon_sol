import React from 'react';
import { Star as StarIcon, Package } from 'lucide-react';
import type { Product, ProductCardProps } from '../../types';

export const ProductCard: React.FC<ProductCardProps & { onRestock?: (product: Product) => void }> = ({ product, onAddToCart, isSupplier = false, onRestock }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-start space-x-4">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
        <Package className="w-10 h-10 text-gray-400" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{product.name}</h4>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="flex items-center space-x-2 mt-2">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          {isSupplier && product.restocked && (
            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Re-stocked</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-bold text-lg text-green-600">₹{product.price}</span>
            <span className="text-sm text-gray-500">/{product.unit}</span>
          </div>
          {!isSupplier && onAddToCart && (
            <button onClick={() => onAddToCart(product)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">Add</button>
          )}
          {isSupplier && (
            <div className="flex gap-2">
              <button className="text-green-600 text-sm font-medium hover:underline">Edit</button>
              <button onClick={() => onRestock && onRestock(product)} className="text-blue-600 text-sm font-medium hover:underline">Re-stocked</button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);