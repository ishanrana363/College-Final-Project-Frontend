import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useSelector } from 'react-redux';
import { baseUrl } from './../../../util/baseUrl';
import axios from 'axios';
import Spinner from '../../../components/loading-spinner/Spinner';
import UserStatas from './UserStatas';
import { Bar } from "react-chartjs-2"

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const getToken = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: getToken,
        },
    };
    const email = user?.email
    console.log(email);

    const { data: userStatas = [], refetch, isError, isLoading } = useQuery({
        queryKey: ['bankInfoList'],
        queryFn: async () => {
            const res = await axios.get(`${baseUrl()}/user-status/${email}`, config);
            return res.data;
        }
    });

    const userStatasData = userStatas?.data

    console.log(userStatasData);


    if (isLoading) return <div>
        <Spinner></Spinner>
    </div>;

    const data = {
        labels: ['Total Payment', 'Total Reviews', 'Total Purchased Products'],
        datasets: [
            {
                label: 'User Stats',
                data: [userStatasData?.totalPayments, userStatasData?.totalReviews * 10, userStatasData?.totalPurchadedProducts * 10],
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',],
                borderColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        if (tooltipItem.label === 'Total Payments') {
                            return `Total Payments: $${tooltipItem.raw.toFixed(2)}`;
                        }
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            }
        }
    }





    return (
        <div className='' >
            <div>
                <h1 className='text-2xl font-semibold mb-4'>User Dashboard</h1>
                <p className='text-gray-500'>Hi, {user?.username}! Welcome to your user dashboard.</p>
            </div>
            <div>
                <UserStatas userStatasData={userStatasData} ></UserStatas>
            </div>
            <div className='mb-6'>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default UserDashboard
