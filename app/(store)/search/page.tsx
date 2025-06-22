import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function searchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const { query } = await searchParams;
  const product = await searchProductsByName(query);

  if (!product.length) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            No products found for:{" "}
            <span className="text-red-600">&quot;{query}&quot;</span>
          </h1>
          <p className="text-base text-gray-600">
            Try searching with different keywords or double-check for typos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg w-full max-w-6xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Search results for:{" "}
          <span className="text-blue-600">&quot;{query}&quot;</span>
        </h1>
        <ProductGrid products={product} />
      </div>
    </div>
  );
}

export default searchPage;
