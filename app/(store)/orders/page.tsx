import { getMyOrder } from "@/sanity/lib/orders/getMyOrder";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface ProductItem {
  product: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
    price: number;
    image?: {
      asset?: {
        _ref: string;
        _type: string;
      };
      [key: string]: unknown;
    };
    currency?: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  orderNumber: string;
  stripeCheckoutSession: string;
  stripeCustomerId: string;
  customerName: string;
  email: string;
  stripePaymentIntentId: string;
  totalPrice: number;
  currency: string;
  amountDiscounted: number;
  status: string;
  orderDate: string;
  products: ProductItem[];
}

const Orders = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const orders: Order[] = await getMyOrder(userId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">My Orders</h1>
          <p className="text-sm text-gray-500 mt-2">
            View all your recent purchases
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600 text-lg font-medium">
              You have not placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Status:{" "}
                        <span className="font-medium">{order.status}</span>
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                      <p>
                        Total:{" "}
                        <span className="font-semibold">
                          ${order.totalPrice.toFixed(2)}
                        </span>{" "}
                        {order.currency}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Items:
                    </h3>
                    <ul className="divide-y divide-gray-100">
                      {order.products?.map((item, index) => (
                        <li
                          key={index}
                          className="py-2 flex justify-between text-sm text-gray-700"
                        >
                          <span>
                            {item.product?.name} × {item.quantity}
                          </span>
                          <span>
                            ${(item.product?.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
