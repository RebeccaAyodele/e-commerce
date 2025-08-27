import { Slider } from "@/components/ui/slider"
import { useState } from "react"

const Filter = () => {
    const [range, setRange] = useState<number[]>([0, 200]);
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2>Filters</h2>
            <p>Clear all</p>
        </div>
        <div className="flex justify-between items-center border-b-2">
            {/* Price */}
            <h2>Price</h2>
            <Slider
                value={range}
                onValueChange={setRange}
                min={0}
                max={200}
                step={1}
                className="w-full"
            />
            <div className="flex justify-between w-full mt-4">
                <div className="flex flex-col">
                <h2>Min</h2>
                <p>${range[0]}</p>
            </div>
            <div className="flex flex-col">
                <h2>Max</h2>
                <p>${range[1]}</p>
            </div>
            </div>
        </div>

        {/* Brand */}
        <div></div>

        {/* Discount range */}
        <div></div>
    </div>
  )
}

export default Filter
