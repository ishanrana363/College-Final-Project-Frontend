import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useSelector } from 'react-redux';
import { baseUrl } from './../../../util/baseUrl';
import axios from 'axios';
import Spinner from '../../../components/loading-spinner/Spinner';
import UserStatas from './UserStatas';

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





    return (
        <div className='' >
            <div>
                <h1 className='text-2xl font-semibold mb-4'>User Dashboard</h1>
                <p className='text-gray-500'>Hi, {user?.username}! Welcome to your user dashboard.</p>
            </div>
            <div>
                <UserStatas userStatasData = {userStatasData} ></UserStatas>
            </div>
        </div>
    )
}

export default UserDashboard
