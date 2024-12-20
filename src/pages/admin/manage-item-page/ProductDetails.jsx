import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../util/baseUrl";
import axios from "axios";
import Spinner from "../../../components/loading-spinner/Spinner";

const ProductDetails = () => {
    window.scrollTo(0, 0); // Ensure the page scrolls to the top on load
    const { id } = useParams();
    const getToken = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: getToken,
        },
    };

    const { data: productDetails = {}, isLoading } = useQuery({
        queryKey: ["productDetails", id], // Include `id` in the query key for caching
        queryFn: async () => {
            const res = await axios.get(`${baseUrl()}/single-product/${id}`, config);
            return res.data.data;
        },
        enabled: !!id, // Ensure the query runs only when `id` is available
    });

    const { product, reviews } = productDetails;

    if (isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className="w-full lg:w-1/3 rounded-md"
                        />
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Author Name: {product?.author?.username}
                            </h1>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Product Name: {product?.name}
                            </h1>
                            <p className="text-gray-500 mb-2">Category: {product?.category}</p>
                            <p className="text-gray-700 mb-4">{product?.description}</p>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-lg font-semibold text-green-600">
                                    ${product?.price}
                                </span>
                                <span className="text-sm line-through text-gray-400">
                                    ${product?.oldPrice}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">Color: {product?.color}</p>
                            <p className="text-sm text-gray-500">Rating: {product?.rating} / 5</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>
                    <div className="space-y-4">
                        {reviews && reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-4 bg-gray-50 border rounded-md shadow-sm"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <img
                                        src={review?.userId?.profileImg}
                                        alt={review?.userId?.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-gray-800 font-semibold">
                                            {review?.userId?.username}
                                        </h3>
                                        <p className="text-sm text-gray-500">{review?.userId?.email}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-2">{review?.comments}</p>
                                <p className="text-sm text-gray-500">
                                    Rating: {review?.rating} / 5
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
