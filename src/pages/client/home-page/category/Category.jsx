import React from "react";
import { NavLink } from "react-router-dom";

const Category = () => {
    const categories = [
        {
            name: "Accessories",
            img: ".https://res.cloudinary.com/dj2edy2rg/image/upload/v1732984147/category-4_1_-_Copy_wnltv6.jpg",
            path: "/categories/accessories",
        },
        {
            name: "Dress Collection",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732984147/category-2_-_Copy_nzd2z9.jpg",
            path: "/categories/dress",
        },
        {
            name: "Jewellery",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732984147/category-3_-_Copy_haciks.jpg",
            path: "/categories/jewellery",
        },
        {
            name: "Cosmetics",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732984146/category-1_1_-_Copy_hels2s.jpg",
            path: "/categories/cosmetics",
        },
        {
            name: "Footwear",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732984146/category-1_1_-_Copy_hels2s.jpg",
            path: "/categories/footwear",
        },
    ];

    return (
        <div className=" max-w-4xl mx-auto my-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map((category, index) => (
                    <NavLink
                        key={index}
                        className=" bg-white   overflow-hidden transform transition-all duration-300 hover:scale-105"
                        to={category.path}
                    >
                        <img
                            src={category.img}
                            alt={category.name}
                            className="w-16 h-16 block mx-auto rounded-full object-cover"
                        />
                        <h4 className="text-center text-xl font-semibold py-4">{category.name}</h4>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Category;
