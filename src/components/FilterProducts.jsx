import React from "react";

const FilterProducts = ({ filterClear, filterState, filter, settFilterState }) => {
    return (
        <div className="space-y-5 flex-shrink-0">
            <h3 className="text-xl font-bold">Filters</h3>

            {/* Categories Filter */}
            <div className="flex flex-col space-y-1">
                <h3 className="font-medium text-lg mb-3">Categories</h3>
                {filter.categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={filterState.category === category}
                            onChange={(e) =>
                                settFilterState({ ...filterState, category: e.target.value })
                            }
                        />
                        <span>{category}</span>
                    </label>
                ))}
            </div>

            {/* Colors Filter */}
            <div className="flex flex-col space-y-1">
                <h3 className="font-medium text-lg mb-3">Color</h3>
                {filter.colors.map((color) => (
                    <label key={color} className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="color"
                            value={color}
                            checked={filterState.color === color}
                            onChange={(e) =>
                                settFilterState({ ...filterState, color: e.target.value })
                            }
                        />
                        <span>{color}</span>
                    </label>
                ))}
            </div>

            {/* Price Filter */}
            <div className="flex flex-col space-y-1">
                <h3 className="font-medium text-lg mb-3">Price</h3>
                {filter.priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center space-x-3">
                        <input
                            type="radio"
                            name="priceRange"
                            value={`${range.min}-${range.max}`}
                            checked={
                                filterState.priceRange === `${range.min}-${range.max}`
                            }
                            onChange={(e) =>
                                settFilterState({
                                    ...filterState,
                                    priceRange: e.target.value,
                                })
                            }
                        />
                        <span>{range.label}</span>
                    </label>
                ))}
            </div>

            {/* Clear Filters */}
            <button
                onClick={filterClear}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default FilterProducts;
