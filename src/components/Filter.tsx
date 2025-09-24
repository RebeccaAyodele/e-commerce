import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Product } from "@/types";

interface FilterProps {
  products: Product[];
  onFilter: (filters: {
    priceRange: number[];
    brand: string;
    discount: number;
  }) => void;
}

const Filter = ({ products, onFilter }: FilterProps) => {
  const [range, setRange] = useState<number[]>([0, 2000]);
  const [brand, setBrand] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [brands, setBrands] = useState<string[]>([]);

  const [showAllBrands, setShowAllBrands] = useState(false);
  const [brandOpen, setBrandOpen] = useState(true);
  const [discountOpen, setDiscountOpen] = useState(true);

  useEffect(() => {
    if (products) {
      const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
      setBrands(uniqueBrands);
    }
  }, [products]);

  useEffect(() => {
    onFilter({ priceRange: range, brand, discount });
  }, [range, brand, discount, onFilter]);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          className="text-blue-500 text-sm"
          onClick={() => {
            setRange([0, 2000]);
            setBrand("");
            setDiscount(0);
          }}
        >
          Clear all
        </button>
      </div>

      {/* Price */}
      <div className="mb-4 border-b-2 border-gray-200">
        <h2 className="text-xl font-medium py-2">Price</h2>
        <Slider
          value={range}
          onValueChange={setRange}
          min={0}
          max={2000}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between my-2 mx-6 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-400">Min</span>
            <span>${range[0]}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-400">Max</span>
            <span>${range[1]}</span>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="mb-4 border-b-2 border-gray-200">
        <button
          type="button"
          className="flex justify-between items-center w-full font-medium"
          onClick={() => setBrandOpen(!brandOpen)}
        >
          <span className="text-xl font-medium py-2">Brand</span>
          {brandOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {brandOpen && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="brand"
                value=""
                checked={brand === ""}
                onChange={() => setBrand("")}
              />
              All
            </label>
            {(showAllBrands ? brands : brands.slice(0, 5)).map((b) => (
              <label key={b} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="brand"
                  value={b}
                  checked={brand === b}
                  onChange={() => setBrand(b)}
                />
                {b}
              </label>
            ))}
            {brands.length > 5 && !showAllBrands && (
              <button
                type="button"
                className="text-blue-500 text-sm"
                onClick={() => setShowAllBrands(true)}
              >
                +{brands.length - 5} more
              </button>
            )}
          </div>
        )}
      </div>

      {/* Discount */}
      <div>
        <button
          type="button"
          className="flex justify-between items-center w-full font-medium"
          onClick={() => setDiscountOpen(!discountOpen)}
        >
          <span className="text-xl font-medium py-2">Discount</span>
          {discountOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {discountOpen && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="discount"
                value={0}
                checked={discount === 0}
                onChange={() => setDiscount(0)}
              />
              All
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="discount"
                value={1}
                checked={discount === 1}
                onChange={() => setDiscount(1)}
              />
              Less than 10%
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="discount"
                value={10}
                checked={discount === 10}
                onChange={() => setDiscount(10)}
              />
              10% or more
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="discount"
                value={20}
                checked={discount === 20}
                onChange={() => setDiscount(20)}
              />
              20% or more
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="discount"
                value={30}
                checked={discount === 30}
                onChange={() => setDiscount(30)}
              />
              30% or more
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="discount"
                value={50}
                checked={discount === 50}
                onChange={() => setDiscount(50)}
              />
              50% or more
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
