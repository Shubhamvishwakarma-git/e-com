"use client";

import { useEffect, useState } from "react";
import useBasketStore from "../store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Addtobasketbutton from "@/components/Addtobasketbutton";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Loader from "@/components/Loader";
import {
  createCheckoutSession,
  Metadata,
} from "@/action/createCheckoutSession";

const BasketPage = () => {
  const groupedItem = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isclient, setisclient] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisclient(true);
  }, []);

  if (!isclient) return <Loader />;

  if (groupedItem.length === 0) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Cart</h1>
        <p className="text-lg text-gray-500">Your cart is currently empty.</p>
      </div>
    );
  }

  const handlecheckout = async () => {
    if (!isSignedIn) return;
    setisLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItem, metadata);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow space-y-6">
          {groupedItem.map((item) => (
            <div
              key={item.product._id}
              className="p-4 sm:p-5 mb-4 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between gap-4 bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name || "Product Image"}
                      className="w-full h-full object-contain"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate max-w-[250px] sm:max-w-xs">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Price: $
                    {((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Addtobasketbutton product={item.product} disabled={false} />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 sticky top-4 h-fit bg-white p-6 border border-gray-200 rounded-xl shadow-md order-first lg:order-last">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Items</span>
              <span>
                {groupedItem.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3 text-lg font-semibold">
              <span>Total</span>
              <span>
                ${useBasketStore.getState().getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          {isSignedIn ? (
            <button
              onClick={handlecheckout}
              disabled={isLoading}
              className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
                Sign in to checkout
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
