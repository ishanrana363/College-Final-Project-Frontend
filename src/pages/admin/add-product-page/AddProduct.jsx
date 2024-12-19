import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { uploadImg } from './../../../upload-img/UploadImg';
import { createAlert } from "../../../helper/createAlert";
import axios from "axios";
import { baseUrl } from './../../../util/baseUrl';
import Swal from "sweetalert2";

const AddProduct = () => {
  const [loading, setIsLoading] = useState();
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const oldPrice = e.target.oldPrice.value;
    const image = e.target.image.files[0];
    const color = e.target.color.value;

    let imgUrl = ""

    if (!image?.name) {
      imgUrl = ""
    }
    imgUrl = await uploadImg(image);

    const payload = {
      name,
      category,
      description,
      price,
      oldPrice,
      image: imgUrl,
      color
    };

    try {
      const resp = await createAlert();
      if (resp.isConfirmed) {
        setIsLoading(true);
        let res = await axios.post(`${baseUrl()}/create-product`, payload, config);
        setIsLoading(false);
        if (res) {
          Swal.fire({
            title: 'Product added successfully!',
            icon: 'success',
            confirmButtonText: 'Close',
          })
          e.target.reset();
          return;
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: `Product uploaad fail`,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }


  return (
    <div className="mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <Helmet>
        <title>Add New Product</title>
      </Helmet>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-5 " >
          {/* Product Name */}
          <div className="">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"

              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              id="category"
              name="category"

              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"

              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
            />
          </div>

          {/* Price */}
          <div className="">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              id="price"
              name="price"

              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Old Price */}
          <div className="">
            <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700">Old Price</label>
            <input
              type="text"
              id="oldPrice"
              name="oldPrice"
              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image URL */}
          <div className="">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="file"
              id="image"
              name="image"

              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Color */}
          <div className="">
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              id="color"
              name="color"

              required
              className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-1/6 mt-4 bg-blue-500 text-white font-medium py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
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
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
