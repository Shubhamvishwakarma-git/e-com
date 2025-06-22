import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
        *[_type == "category"] | order(name asc)
        `);

  try {
    //use sanityfetch to send the query
    const categories = await sanityFetch({ query: ALL_CATEGORIES_QUERY });
    // return th elist of products, or an emoty error if none are found
    return categories.data || [];
  } catch (error) {
    console.log("error fetching the products: ", error);
    return [];
  }
};
