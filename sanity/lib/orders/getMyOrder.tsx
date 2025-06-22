// import { defineQuery } from "next-sanity";
// import { sanityFetch } from "../live";

// export async function getMyOrder(userId: string) {
//   if (!userId) {
//     throw new Error("user id is required");
//   }

//   const MY_ORDERS_QUERY = defineQuery(`
//     *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
//         ...,
//         products[]{
//             ...,
//             product->
//         }
//     }
//     `);

//   try {
//     const orders = await sanityFetch({
//       query: MY_ORDERS_QUERY || [],
//       params: { userId },
//     });

//     return orders.data || [];
//   } catch (error) {
//     console.error("Error fetching order or there is not order made till now !");
//     throw new Error("Error fetching orders");
//   }
// }

import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrder(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && stripeCustomerId == $userId] | order(orderDate desc){
      _id,
      orderNumber,
      stripeCheckoutSession,
      stripeCustomerId,
      customerName,
      email,
      stripePaymentIntentId,
      totalPrice,
      currency,
      amountDiscounted,
      status,
      orderDate,
      products[]{
        quantity,
        product->{
          _id,
          name,
          slug,
          price,
          image,
          currency
        }
      }
    }
  `);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });

    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
}
