import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../../components/data/product";
import ProductCard from "../../../components/product-card/ProductCard";

const CategoryProduct = () => {
    const [categoryData, setCategoryData] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        // Filter products based on category
        const filterData = products.filter(
            (products) => products.category.toLowerCase() === categoryName.toLowerCase()
        );
        setCategoryData(filterData);
    }, [categoryName]);

    return (
        <div className="w-11/12 mx-auto " >
            {/* Category Banner Section */}
            <section className="bg-[#FB977C] h-[40vh] my-9 flex flex-col items-center justify-center rounded-lg">
                <h2 className="text-black text-3xl font-semibold">{categoryName.toLocaleUpperCase()}</h2>
                <p className="text-center text-lg mt-2">
                    Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
                </p>
            </section>
            <ProductCard product={categoryData} categoryData={categoryName} ></ProductCard>
        </div>
    );
};

export default CategoryProduct;
