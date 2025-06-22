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
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-8">
      {/* Category Sidebar */}
      <div className="w-full lg:w-64">
        <div className="bg-white shadow-md rounded-xl p-4 sticky top-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Categories
          </h2>
          <Categoryselectorcomponent categories={categories} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default Productsview;
