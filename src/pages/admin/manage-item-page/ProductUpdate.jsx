import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../util/baseUrl";
import axios from "axios";
import { uploadImg } from "../../../upload-img/UploadImg";
import { updateAlert } from "../../../helper/loginAlert";
import Swal from "sweetalert2";

const ProductUpdate = () => {
    const { id } = useParams();
    const [loading, setIsLoading] = useState(false);

    const getToken = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: getToken,
        },
    };

    const { data: singleProudcts = {}, isLoading, refetch } = useQuery({
        queryKey: ["singleProudcts"],
        queryFn: async () => {
            const res = await axios.get(`${baseUrl()}/single-product/${id}`, config);
            console.log(res.data?.data?.product);
            return res.data?.data?.product;
        },
    });

    const { image: upcommingImg } = singleProudcts;
    console.log("upcomming image",upcommingImg);



    const handleSubmit = async (e) => {
        e.preventDefault();


        const name = e.target.name.value;
        const category = e.target.category.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const oldPrice = e.target.oldPrice.value;
        const image = e.target.image.files[0];
        console.log("image url is" , image)
        const color = e.target.color.value;

        let imgUrl = upcommingImg

        if (image) {
            imgUrl = await uploadImg(image)
        }else{
            imgUrl = upcommingImg
        }

        const payload = {
            name,
            category,
            description,
            price,
            oldPrice,
            image: imgUrl,
            color,
        };

        try {
            const resp = await updateAlert();
            if (resp.isConfirmed) {
                setIsLoading(true);
                const res = await axios.put(`${baseUrl()}/product-update/${id}`, payload, config);
                setIsLoading(false);
                if (res) {
                    Swal.fire({
                        title: 'Product updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    })
                    refetch();
                    return;
                }
            }
        } catch (error) {
            setIsLoading(false)
            Swal.fire({
                title: 'Error',
                text: `Product update failed`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
            })
            console.error(error);
        }

    }

    return (
        <div className=" mx-auto p-6 bg-white shadow-md rounded-md">
            <Helmet>
                <title>Dashboard | Product Update Form</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4 text-center">Product Update Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-5 " >
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={singleProudcts?.name}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block font-medium mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            defaultValue={singleProudcts?.category}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter product category"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={singleProudcts?.description}
                            rows="5"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block font-medium mb-1">
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            defaultValue={singleProudcts?.price}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter product price"
                        />
                    </div>

                    {/* Old Price */}
                    <div>
                        <label htmlFor="oldPrice" className="block font-medium mb-1">
                            Old Price
                        </label>
                        <input
                            type="text"
                            id="oldPrice"
                            name="oldPrice"
                            defaultValue={singleProudcts?.oldPrice}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter old price"
                        />
                    </div>

                    {/* Image */}


                    <div>
                        <label htmlFor="image" className="block font-medium mb-1">
                            Image URL
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter image URL"
                        />
                    </div>


                    {/* Color */}
                    <div>
                        <label htmlFor="color" className="block font-medium mb-1">
                            Color
                        </label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            defaultValue={singleProudcts?.color}
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Enter product color"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading} // Disable button when loading
                    className={`w-1/6 bg-blue-500 text-white font-medium py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                >
                    {loading ? (
                        <div className="flex justify-center items-center">
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
                            Processing...
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div>
    );
};

export default ProductUpdate;
