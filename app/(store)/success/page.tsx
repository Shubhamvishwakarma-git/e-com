"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import useBasketStore from "../store";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl max-w-xl w-full text-center">
        <div className="h-16 w-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>

        <p className="text-gray-600 text-base sm:text-lg mb-6">
          Your order has been confirmed and will be shipped shortly.
        </p>

        {orderNumber && (
          <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">Order Number:</p>
            <p className="text-green-700 font-mono text-lg font-semibold break-all">
              {orderNumber}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
