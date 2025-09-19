import type { Product } from "../types";
import Star from "./Star";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <div>
                <img 
                src={product.thumbnail}
                alt={product.title}
                className="mx-auto object-contain h-40"
                loading="lazy"
            />
            </div>
            <div>
                <p className="font-semibold text-black/90">{product.title}</p>
                <span className="flex items-center gap-2 justify-evenly">
                    <p className="text-xs">{product.brand}</p>
                    <p className="text-xs flex text-gray-400">{product.rating}{Star(product.rating)}</p>
                </span>
                <span className="flex items-center justify-evenly">
                    <p className="font-semibold text-black/80">${(product.price * (product.discountPercentage / 100)).toFixed(2)}</p>
                    <p className="line-through text-black/60 text-xs">${product.price}</p>
                    <p className="text-green-600 text-xs">({product.discountPercentage}% off)</p>
                </span>
            </div>
        </div>
    )
}

export default ProductCard;