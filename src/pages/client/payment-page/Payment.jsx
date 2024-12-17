import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../util/baseUrl';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../components/loading-spinner/Spinner';

const Payment = () => {
  const { user } = useSelector((state) => state.auth);
  const email = user?.email;

  // Fetch the token
  const getToken = localStorage.getItem('token');
  const config = getToken
    ? { headers: { Authorization: getToken } }
    : {};

  // Fetch orders using react-query
  const { data: allOrders = [], isLoading, isError } = useQuery({
    queryKey: ['all-orders', email],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl()}/all-orders/${email}`, config);
      return res.data.data || [];
    },
    enabled: !!email, // Fetch only when email exists
  });



  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">Failed to load orders.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4">Total Payments</h2>
      {/* <p className="text-lg font-semibold mb-6">
        Total Spent: ${totalPayments.toFixed(2)}
      </p> */}

      {allOrders.map((order) => (
        <div key={order._id} className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Order #{order._id}</h3>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Order Id:</span> {order.orderId}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Price:</span> ${order.amount || '0.00'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'Time'}
          </p>
          <p className="text-sm">
            <span className="font-medium">Status:</span>{' '}
            <span
              className={`px-2 py-1 rounded-md text-white text-xs font-semibold ${order.status === 'pending'
                ? 'bg-red-500'
                : order.status === 'processing'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-green-500'
                }`}
            >
              {order.status || 'completed'}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Payment;
