import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { error } from "console";

export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[
            _type == "product"
            && name match $searchParam
        ] | order(name asc) 
        `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParam: `${searchParam}*`,
      },
    });
    return products.data || [];
  } catch (erro) {
    console.error("enter fetching product by name :", error);
    return [];
  }
};
