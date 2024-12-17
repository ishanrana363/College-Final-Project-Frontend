import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import TimelineStep from '../../../components/step/TimelineStep';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../../../util/baseUrl';

const steps = [
    {
        status: 'pending',
        label: 'Pending',
        description: 'Your order has been created and is awaiting processing.',
        icon: { iconName: 'edit-2-line', bgColor: 'red-500', textColor: 'gray-800' },
    },
    {
        status: 'processing',
        label: 'Processing',
        description: 'Your order is currently being processed.',
        icon: { iconName: 'loader-line', bgColor: 'yellow-500', textColor: 'yellow-800' },
    },
    {
        status: 'shipped',
        label: 'Shipped',
        description: 'Your order has been shipped.',
        icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-100' },
    },
    {
        status: 'completed',
        label: 'Completed',
        description: 'Your order has been successfully completed.',
        icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'white' },
    },
];

const OrderDetails = () => {
    const { id } = useParams();
    const getToken = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: getToken,
        },
    };

    const { data: singleOrders = {}, refetch, isError, isLoading } = useQuery({
        queryKey: ['singleOrders', id],
        queryFn: async () => {
            const res = await axios.get(`${baseUrl()}/order-by-id/${id}`, config);
            return res.data.data;
        },
    });

    // Check if a step is completed
    const isCompleted = useCallback(
        (status) => {
            const statuses = ['pending', 'processing', 'shipped', 'completed'];
            return statuses.indexOf(status) < statuses.indexOf(singleOrders?.status);
        },
        [singleOrders?.status]
    );

    // Check if a step is the current status
    const isCurrent = useCallback(
        (status) => singleOrders?.status === status,
        [singleOrders?.status]
    );

    if (isLoading) {
        return <div className="text-center mt-6">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 mt-6">Error loading order details!</div>;
    }

    return (
        <div>
            <div className="w-11/12 mx-auto rounded p-6">
                <h2 className="text-2xl font-semibold mb-4">Payment {singleOrders?.status}</h2>
                <p className="mb-4">Order Id: {singleOrders?.orderId}</p>
                <p className="mb-8">Status: {singleOrders?.status}</p>

                <ol className="sm:flex items-center relative">
                    {steps.map((step, index) => (
                        <TimelineStep
                            key={index}
                            step={step}
                            order={singleOrders}
                            isCompleted={isCompleted(step.status)}
                            isCurrent={isCurrent(step.status)}
                            isLastStep={index === steps.length - 1}
                            icon={step.icon}
                            description={step.description}
                        />
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default OrderDetails;
