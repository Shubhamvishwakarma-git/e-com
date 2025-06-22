"use client";

import useBasketStore from "@/app/(store)/store";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";

interface Addtobasketbuttonprops {
  product: Product;
  disabled: boolean;
}

const Addtobasketbutton = ({ product, disabled }: Addtobasketbuttonprops) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isclient, setisclient] = useState(false);

  useEffect(() => {
    setisclient(true);
  }, []);

  if (!isclient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0 || disabled}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 text-xl font-bold shadow-sm ${
          itemCount === 0 || disabled
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 text-gray-700 hover:bg-gray-300"
        }`}
      >
        −
      </button>

      <span className="min-w-[2rem] text-center font-medium text-gray-800 text-base">
        {itemCount}
      </span>

      <button
        onClick={() => addItem(product)}
        disabled={disabled}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 text-xl font-bold shadow-sm ${
          disabled
            ? "bg-blue-300 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        +
      </button>
    </div>
  );
};

export default Addtobasketbutton;
