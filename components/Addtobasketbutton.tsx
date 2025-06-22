"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useBasketStore from "@/app/(store)/store";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";

interface Addtobasketbuttonprops {
  product: Product;
  disabled: boolean;
  hideActions?: boolean;
}

const Addtobasketbutton = ({ product, disabled, hideActions }: Addtobasketbuttonprops) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleAddToCart = () => addItem(product);
  const handleViewCart = () => router.push("/basket");

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Quantity control */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => removeItem(product._id)}
          disabled={itemCount === 0 || disabled}
          className={`w-10 h-10 rounded-full text-xl font-bold flex items-center justify-center shadow ${
            itemCount === 0 || disabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-800 hover:bg-gray-300"
          }`}
        >
          −
        </button>

        <span className="text-lg font-medium text-gray-800 min-w-[2rem] text-center">
          {itemCount}
        </span>

        <button
          onClick={() => addItem(product)}
          disabled={disabled}
          className={`w-10 h-10 rounded-full text-xl font-bold flex items-center justify-center shadow ${
            disabled
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          +
        </button>
      </div>

      {/* Action buttons */}
      {!hideActions && (
        <div className="flex gap-50 mt-3">
          <Button
            size="lg"
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
          >
            Add to Cart
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleViewCart}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold px-6"
          >
            View Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default Addtobasketbutton;
