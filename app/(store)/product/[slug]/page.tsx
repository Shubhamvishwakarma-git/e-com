import Addtobasketbutton from "@/components/Addtobasketbutton";
import { imageUrl } from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 60; // revalidate at most every 60 seconds

async function Productpage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> rerendered the product page cache for ${slug}`
  );

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg border bg-gray-100 ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name || "Product Image"}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
              <span className="text-white font-bold text-xl tracking-wide">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              ${product.price?.toFixed(2)}
            </p>
            <div className="prose max-w-none text-gray-700 mb-6">
              {Array.isArray(product.desc) && (
                <PortableText value={product.desc} />
              )}
            </div>
          </div>

          <div className="mt-6">
            <Addtobasketbutton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productpage;
