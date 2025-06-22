"use client";

import { Category, Product } from "../sanity.types";
import ProductGrid from "./ProductGrid";
import { Categoryselectorcomponent } from "./ui/category-selector";

interface ProductsviewProps {
  products: Product[];
  categories: Category[];
}

const Productsview = ({ products, categories }: ProductsviewProps) => {
  return (
    <div className="px-4 md:px-10 py-8 bg-gray-50 min-h-screen">
      {/* Category Selector on Top */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Category</h2>
        <div className="w-full max-w-xs">
          <Categoryselectorcomponent categories={categories} />
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
};

export default Productsview;
