import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../../../components/data/product";
import { FaShoppingCart, FaStar } from "react-icons/fa";

const CategoryProduct = () => {
    const [categoryData, setCategoryData] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        const filterData = product.filter(
            (products) => products.category.toLowerCase() === categoryName.toLowerCase()
        );
        setCategoryData(filterData);
    }, [categoryName]); // Update the effect when categoryName changes

    return (
        <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categoryData.length > 0 ? (
                categoryData.map((item, i) => (
                    <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* Image Section */}
                        <div className="relative">
                            <img
                                className="w-full h-56 object-cover"
                                src={item.image} // Use item data dynamically
                                alt={item.name}
                            />
                            {/* Cart Icon */}
                            <div className="absolute top-2 right-2">
                                <button className="bg-red-500 p-2 rounded-full">
                                    <FaShoppingCart className="text-white w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        {/* Product Details */}
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-center ">{item.name}</h2>
                            <p className="text-black text-center font-semibold mt-1">${item.price.toFixed(2)}</p>
                            {/* Dynamic Rating Section */}
                            <div className="flex items-center mt-2">
                                {Array.from({ length: Math.round(item.rating) }).map((_, index) => (
                                    <FaStar key={index} className="text-yellow-400 w-5 h-5" />
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 text-center">No products found in this category.</p>
            )}
        </div>
    );
};

export default CategoryProduct;
