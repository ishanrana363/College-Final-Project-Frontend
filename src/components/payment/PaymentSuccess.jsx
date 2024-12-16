import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { baseUrl } from '../../util/baseUrl';
import Spinner from '../loading-spinner/Spinner';
import TimelineStep from '../step/TimelineStep';

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

const PaymentSuccess = () => {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const query = new URLSearchParams(window.location.search);
            const sessionId = query.get('session_id');

            if (!sessionId) {
                setError('Invalid session ID.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.post(
                    `${baseUrl()}/confirm-payment`,
                    { session_id: sessionId },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );

                if (response?.data) {
                    setOrder(response.data.data);
                } else {
                    setError('Failed to fetch order details.');
                }
            } catch (err) {
                setError('An error occurred while confirming payment.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, []);

    const isCompleted = useCallback(
        (status) => {
            const statuses = ['pending', 'processing', 'shipped', 'completed'];
            return statuses.indexOf(status) < statuses.indexOf(order?.status);
        },
        [order]
    );

    const isCurrent = useCallback(
        (status) => order?.status === status,
        [order]
    );

    if (isLoading) return <Spinner />;

    if (error) {
        return (
            <div className="section__container rounded p-6">
                <h2 className="text-2xl font-semibold mb-4">Payment Error</h2>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="section__container rounded p-6">
                <h2 className="text-2xl font-semibold mb-4">Order Not Found</h2>
                <p className="text-gray-500">We could not retrieve your order details. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Payment {order?.status}</h2>
            <p className="mb-4">Order Id: {order?.orderId}</p>
            <p className="mb-8">Status: {order?.status}</p>

            <ol className="sm:flex items-center relative">
                {steps.map((step, index) => (
                    <TimelineStep
                        key={index}
                        step={step}
                        order={order}
                        isCompleted={isCompleted(step.status)}
                        isCurrent={isCurrent(step.status)}
                        isLastStep={index === steps.length - 1}
                        icon={step.icon}
                        description={step.description}
                    />
                ))}
            </ol>
        </div>
    );
};

export default PaymentSuccess;
