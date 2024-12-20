import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // Import React Icons
import { IoClose } from 'react-icons/io5';
import { baseUrl } from '../../../util/baseUrl';
import axios from 'axios';
import { updateAlert } from '../../../helper/loginAlert';
import { deleteAlert } from '../../../helper/deleteAlert';
import Swal from 'sweetalert2';

const AllOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const getToken = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: getToken,
    },
  };

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl()}/all-orders`, config);
      return res.data.data; // Directly return the data
    },
  });

  const handleStatusChange = async (status) => {
    setNewStatus(status);
    try {
      let resp = await updateAlert();
      if (resp.isConfirmed) {
        await axios.put(
          `${baseUrl()}/order-update/${selectedOrder._id}`,
          { status },
          config
        );
        const updatedOrders = orders.map((order) =>
          order._id === selectedOrder._id ? { ...order, status } : order
        );
        refetch(); // Refetch to ensure the data is updated
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
    setSelectedOrder(null); // Close the modal after changing the status
  };

  const handleDelete = async (orderId) => {
    try {
      let resp = await deleteAlert();
      if(resp.isConfirmed){
        let res = await axios.delete(`${baseUrl()}/order-delete/${orderId}`,config);
        if(res){
          Swal.fire({
            title: 'Order deleted successfully!',
            icon:'success',
            confirmButtonText: 'Close',
          });
          refetch(); // Refetch to ensure the data is updated
        }
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to delete order',
        icon: 'error',
        confirmButtonText: 'Close',
      });
      refetch(); // Refetch to ensure the data is updated
      console.log(error);
    }
  };

  const openStatusModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status); // Set the current status of the order in the modal
  };

  // Function to get the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'processing':
        return 'text-yellow-600';
      case 'pending':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };



  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-5">Orders</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto  text-[12px]">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Products Id</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">Order Date</th>
              <th className="border border-gray-300 px-4 py-2">Update Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                <td className="border border-gray-300 px-4 py-2">{order.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.products.map((product, idx) => (
                    <div key={idx}>
                      {product.productId} (Qty: {product.quantity})
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">${order.amount.toFixed(2)}</td>
                <td
                  onClick={() => openStatusModal(order)} // Open modal on clicking status
                  className={`border border-gray-300 px-4 py-2 cursor-pointer ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(order.updatedAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for changing status */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Change Status</h2>
              <button onClick={() => setSelectedOrder(null)}>
                <IoClose className="text-xl" />
              </button>
            </div>
            <p className="mt-4">Select a new status for the order:</p>
            <div className="mt-4">
              {['pending', 'processing', 'shipped', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`w-full text-white py-2 px-4 rounded-lg mt-2 ${newStatus === status ? 'bg-blue-600' : 'bg-gray-500'}`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
