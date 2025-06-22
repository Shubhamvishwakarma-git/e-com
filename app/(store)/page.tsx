import Productsview from "@/components/Productsview";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Blackfriday from "@/components/Diwali";

export const dynamic = 'force-static'
export const revalidate = 60; // revalidate at most every 60 seconds
export default async function Home() {
  // Simulating a delay to mimic data fetching
  const products = await getAllProducts();
  const categories = await getAllCategories();

    console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> rerendered the home page cache with ${products.length}
      produts and ${categories.length} categories`
  );


  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <Blackfriday />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-10">
            Featured Products
          </h1>
          <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
            Shop the latest trending gadgets and essentials
          </p>
          </div>
        <div className="flex flex-col items-center jusity-top min-h-screen bg-gray-100 p-4">
          <Productsview products={products} categories={categories} />
        </div>
      </div>
    </>
  );
}
