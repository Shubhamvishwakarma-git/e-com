import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
        *[_type == "product"] | order(name asc)

        `);

  try {
    //use sanityfetch to send the query
    const products = await sanityFetch({ query: ALL_PRODUCTS_QUERY });
    // return th elist of products, or an emoty error if none are found
    return products.data || [];
  } catch (error) {
    console.log("error fetching the products: ", error);
    return [];
  }
};


