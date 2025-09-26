import type { Product } from "../types";
import Star from "./Star";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  // Calculate discounted price
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="flex flex-col border rounded-xl md:p-4 p-2 shadow-sm hover:shadow-md transition bg-white h-80">
      {/* Image */}
      <div className="flex justify-center items-center h-40 mb-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain max-h-full"
          loading="lazy"
        />
      </div>

      {/* Title + Brand */}
      <div className="flex flex-col gap-1 flex-1">
        <h3 className="font-medium md:text-base text-xs text-gray-900 line-clamp-2">
          {product.title}
        </h3>
        <span className="text-xs text-gray-500">{product.brand}</span>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
            {Star(product.rating)}
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>

        {/* Pricing */}
        <div className="mt-auto flex items-baseline md:justify-normal justify-around">
          <p className="md:text-lg text-sm font-semibold text-gray-900">
            ${discountedPrice}
          </p>
          <p className="md:text-sm text-xs line-through text-gray-400">${product.price}</p>
          <p className="text-xs text-green-600 font-medium">
            {product.discountPercentage}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
