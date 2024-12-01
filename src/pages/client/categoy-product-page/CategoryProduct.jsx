import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "../../../components/data/product";
import ProductCard from "../../../components/product-card/ProductCard";

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
        <>
            <ProductCard categoryName = {categoryName} categoryData = {categoryData} ></ProductCard>
        </>
    );
};

export default CategoryProduct;
