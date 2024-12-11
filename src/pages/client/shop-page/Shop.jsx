import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../../redux/feature/product/productApi';
import ProductCard from './../../../components/product-card/ProductCard';
import FilterProducts from '../../../components/FilterProducts';

const filter = {
    categories: ["all", "Accessories", "dresses", "jewellery", "cosmetics"],
    colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
    priceRanges: [
        { label: "Under $50", min: 0, max: 50 },
        { label: "$50-$100", min: 50, max: 100 },
        { label: "$100-$200", min: 100, max: 200 },
        { label: "200 and above", min: 200, max: Infinity },
    ]
};

const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterState, setFilterState] = useState({
        category: 'all',
        color: 'all',
        priceRange: ''
    });

    const { category, color, priceRange } = filterState;
    const [minPrice, maxPrice] = priceRange
        ? priceRange.split('-').map(Number)
        : [null, null];

    const { data: productData = {}, isLoading } = useFetchAllProductsQuery({
        category: category !== "all" ? category : "",
        color: color !== "all" ? color : "",
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
        page: currentPage,
        limit: 8,
    });

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= productData?.data?.totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const clearFilter = () => {
        setFilterState({...filterState, category: 'all', color: 'all', priceRange: '' });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const { products, totalPages, totalProducts } = productData?.data || {};
    const startProduct = (currentPage - 1) * 8 + 1;
    const endProduct = startProduct + (products?.length || 0) - 1;

    return (
        <div className="w-11/12 mx-auto">
            <div className="bg-[#FA7B2D] my-10 h-full py-5 lg:h-[50vh] flex flex-col justify-center items-center">
                <h1 className="text-center font-bold lg:text-4xl">Shop Page</h1>
                <p className="text-center text-[10px] lg:text-xl font-semibold lg:mt-4">
                    Discover the Hottest Picks: Elevate Your Style with Our Curated
                    Collection of Trending Women's Fashion Products.
                </p>
            </div>

            <h1 className="lg:text-3xl font-bold mb-12">
                Showing {startProduct} to {endProduct} of {totalProducts} products
            </h1>

            <div className="flex flex-col lg:flex-row lg:gap-10 gap-7">
                <div className="bg-white  p-5  w-full lg:w-1/4">
                    <h2 className="text-lg font-bold mb-4">Categories</h2>
                    <FilterProducts filter = {filter} filterState = {filterState} filterClear = {clearFilter}  settFilterState = {setFilterState} >

                    </FilterProducts>
                </div>

                <div className="my-7 w-full">
                    <h1 className="text-lg font-bold mb-5">Products</h1>
                    <div>
                         <ProductCard product={products} />
                        

                        <div className="flex justify-center gap-4 mt-5">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`border px-3 py-1 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-[#FA7B2D] shadow-md rounded-md'}`}
                            >
                                Prev
                            </button>

                            <span>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        className={`px-2 py-1 ${currentPage === index + 1 ? 'bg-blue-500 rounded-md' : ''}`}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </span>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`border px-3 py-1 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-[#FA7B2D] shadow-md rounded-md'}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
