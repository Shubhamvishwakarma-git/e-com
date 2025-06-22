import { imageUrl } from "@/lib/imageUrl";
import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current || ""}`}
      className={`group flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
        isOutOfStock ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {/* Image section */}
      <div className="relative w-full h-64 bg-gray-100">
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
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <span className="text-white font-bold text-lg tracking-wide">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.75rem]">
          {(product.desc || [])
            .map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join("") || "No description available"}
        </p>
        <p className="text-lg font-bold text-blue-600">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default ProductThumb;
