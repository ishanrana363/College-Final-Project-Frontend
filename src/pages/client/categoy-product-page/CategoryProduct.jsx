import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../../../components/data/product";
import { FaShoppingCart } from "react-icons/fa";
import ProductRating from "../../../components/product-rating/ProductRating"; // Ensure this component is defined

const CategoryProduct = () => {
    const [categoryData, setCategoryData] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        // Filter products based on category
        const filterData = product.filter(
            (products) => products.category.toLowerCase() === categoryName.toLowerCase()
        );
        setCategoryData(filterData);
    }, [categoryName]);

    return (
        <div className="w-11/12 mx-auto">
            {/* Category Banner Section */}
            <section className="bg-[#FB977C] h-[40vh] my-9 flex flex-col items-center justify-center rounded-lg">
                <h2 className="text-black text-3xl font-semibold">{categoryName.toLocaleUpperCase()}</h2>
                <p className="text-center text-lg mt-2">
                    Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
                </p>
            </section>

            {/* Product Grid Section */}
            <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {categoryData.length > 0 ? (
                    categoryData.map((item) => (
                        <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                            {/* Image Section */}
                            <div className="relative">
                                <img
                                    className="w-full h-56 object-cover"
                                    src={item.image} // Dynamically sourced image
                                    alt={item.name}
                                />
                                <div className="absolute top-2 right-2">
                                    <button className="bg-red-500 p-2 rounded-full">
                                        <FaShoppingCart className="text-white w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            {/* Product Details Section */}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-center text-gray-800">{item.name}</h3>
                                <p className="text-center text-black font-semibold mt-1">${item.price.toFixed(2)}</p>
                                <div className="flex justify-center items-center mt-2">
                                    {/* Dynamic Rating Component */}
                                    <ProductRating rating={item?.rating} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center text-xl mt-6">No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryProduct;
