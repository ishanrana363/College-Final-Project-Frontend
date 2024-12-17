import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../util/baseUrl";
import Spinner from "../../../components/loading-spinner/Spinner";
import { Link } from "react-router-dom";

const orders = [
  { id: 1, orderId: "66fad4936e001db7334ba48", date: "9/30/2024", status: "pending", total: "$299.99" },
  { id: 2, orderId: "667f84e024bdf496471b88d4", date: "9/28/2024", status: "processing", total: "$100.00" },
  { id: 3, orderId: "661f22c104b508299ceaeac", date: "9/23/2024", status: "pending", total: "$29.99" },
  { id: 4, orderId: "66edc4bb8431f534eb0a231", date: "9/21/2024", status: "pending", total: "$438.00" },
  { id: 5, orderId: "66e8968cc84fb3b36b87681", date: "9/17/2024", status: "pending", total: "$119.00" },
  { id: 6, orderId: "66e08351199c6fc00ddcefd", date: "9/17/2024", status: "completed", total: "$297.00" },
  { id: 7, orderId: "66d459d7e580755d8438112", date: "9/1/2024", status: "shipped", total: "$329.99" },
  { id: 8, orderId: "663d674e08fdabb5b0786bb", date: "9/1/2024", status: "pending", total: "$78.00" },
  { id: 9, orderId: "66cf505c4d56e75654d9f2bf", date: "8/28/2024", status: "pending", total: "$118.00" },
  { id: 10, orderId: "66bf1919eace874752ed272b6", date: "8/16/2024", status: "pending", total: "$39.99" },
  { id: 11, orderId: "66be3fce4f304191d167ec8", date: "8/15/2024", status: "processing", total: "$229.98" },
  { id: 12, orderId: "66be2dc8f31dc26ea46fd15", date: "8/15/2024", status: "shipped", total: "$19.99" },
];

const statusStyles = {
  pending: "bg-red-100 text-red-600",
  processing: "bg-blue-100 text-blue-600",
  completed: "bg-green-100 text-green-600",
  shipped: "bg-purple-100 text-purple-600",
};

const Order = () => {
  const { user } = useSelector((state) => state.auth);
  const getToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: getToken,
    },
  };
  const email = user?.email
  console.log(email);

  const { data: allOrders = [], refetch, isError, isLoading } = useQuery({
    queryKey: ['allOrders'],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl()}/all-orders/${email}`, config);
      console.log(res.data.data);
      return res.data.data;
    }

  });


  if (isLoading) {
    return <div> <Spinner></Spinner> </div>
  }
  if (isError) {
    return <div>Error fetching orders.</div>;
  }
  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold">Your Orders</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">SEE ALL</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4">#</th>
                <th className="p-4">ORDER ID</th>
                <th className="p-4">DATE</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">TOTAL</th>
                <th className="p-4">VIEW ORDER</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order,index) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{index+1}</td>
                  <td className="p-4">{order.id}</td>
                  <td className="p-4 text-gray-700">{order.orderId}</td>
                  <td className="p-4 text-gray-600">{order.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${statusStyles[order.status]
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{order.total}</td>
                  <td className="p-4">
                    <Link to={`/order-details/${order?._id}`} className="text-indigo-600 hover:underline">
                      View Order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
