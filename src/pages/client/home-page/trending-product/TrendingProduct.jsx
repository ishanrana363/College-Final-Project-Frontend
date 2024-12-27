import React, { useState } from 'react';
import { useFetchAllProductsQuery } from '../../../../redux/feature/product/productApi';
import ProductCard from './../../../../components/product-card/ProductCard';

const TrendingProduct = () => {
    const [visibleProduct, setVisibleProduct] = useState(8); // Number of products to display
    const { data: productData = {}, isLoading, isFetching } = useFetchAllProductsQuery();
    const { products = [] } = productData?.data || {}; // Destructure safely in case of null or undefined data

    const handleMoreProduct = (event) => {
        event.preventDefault();
        setVisibleProduct((prevState) => prevState + 8); // Load 8 more products
    };

    

    return (
        <div className="w-11/12 mx-auto">
            {/* Header Section */}
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="lg:text-3xl font-bold text-black mb-4">
                    Trending Products
                </h2>
                <p className="lg:text-lg text-black">
                    Discover the Hottest Picks: Elevate Your Style with Our Curated
                    Collection of Trending Women's Fashion Products.
                </p>
            </div>

            {/* Product List Section */}
            <div className="mt-6">
                {/* Render Product Cards */}
                <ProductCard product={products.slice(0, visibleProduct)} />
            </div>

            {/* Load More Button */}
            <div className="text-center mt-6">
                {visibleProduct < products.length && (
                    <button
                        type="button"
                        onClick={handleMoreProduct}
                        className="lg:text-lg text-white py-3 px-10 rounded-md bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50"
                        disabled={isFetching || isLoading} // Disable button during loading or fetching
                    >
                        {isFetching || isLoading ? (
                            <div className="flex items-center justify-center">
                                {/* Spinner Animation */}
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Loading...
                            </div>
                        ) : (
                            "Load More"
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TrendingProduct;
