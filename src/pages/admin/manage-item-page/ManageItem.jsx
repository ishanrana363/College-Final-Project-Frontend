import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../../../components/loading-spinner/Spinner";
import { baseUrl } from "../../../util/baseUrl";
import { deleteAlert } from "../../../helper/deleteAlert";
import Swal from "sweetalert2";

const ManageItem = () => {
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("name");

  const getToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: getToken,
    },
  };

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl()}/all-product`, config);
      return res.data.data;
    },
  });



  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const filteredProducts = products.filter((product) => {
    const value = product[filterField]?.toString().toLowerCase() || "";
    return value.includes(search.toLowerCase());
  });

  const clearSearch = () => {
    setSearch("");
    setFilterField("name");
  };


  const deleteProduct = async (id) => {

    try {
      let resp = await deleteAlert();
      if (resp.isConfirmed) {
        let res = await axios.delete(`${baseUrl()}/product-delete/${id}`, config);
        if (res) {
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success"
          })

          refetch();

        }
      }
    } catch (error) {
      
      Swal.fire({
        title: "Delete failed",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      })
      console.error(error)

    }

  };

  return (
    <div className="p-4">
      <Helmet>
        <title>Dashboard | Manage Product</title>
      </Helmet>

      <h1 className="text-center font-bold text-3xl mb-4">Manage Product</h1>

      {/* Search Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="filterField" className="font-medium">
            Search By:
          </label>
          <select
            id="filterField"
            className="border rounded px-2 py-1"
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="createdAt">Created At</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={`Search by ${filterField}...`}
            className="border rounded px-4 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={clearSearch}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Product Table */}
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Old Price</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Rating</th>
            <th className="px-4 py-2">View Product</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredProducts.map((product, id) => (
            <tr key={id} className="border-t border-gray-300">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.oldPrice}</td>
              <td className="px-4 py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 rounded"
                />
              </td>
              <td className="px-4 py-2">{product.color}</td>
              <td className="px-4 py-2">{product.rating}</td>
              <td className="px-4 py-2">
                <Link to={`/dashboard/product-details/${product?._id}`}>
                  {product.name.slice(0, 5)}..
                </Link>
              </td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <Link
                  to={`/dashboard/product-update/${product?._id}`}                >
                  <button className="text-blue-500 hover:text-blue-700 block mt-4">
                    <FaEdit />
                  </button>
                </Link>
                <button onClick={() => deleteProduct(product?._id)} className="text-red-500 hover:text-red-700 mt-4">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageItem;
