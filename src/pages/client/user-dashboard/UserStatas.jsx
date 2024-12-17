import React from 'react'

const UserStatas = ({userStatasData}) => {
    return (
        <div>
            <div className='my-5 space-y-4'>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                        <h2 className='text-xl font-semibold mb-2'>Total Payments</h2>
                        <p className='text-2xl font-bold'>${userStatasData?.totalPayments}</p>
                    </div>
                    <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                        <h2 className='text-xl font-semibold mb-2'>Total Reviews</h2>
                        <p className='text-2xl font-bold'>{userStatasData?.totalReviews}</p>
                    </div>
                    <div className='bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200'>
                        <h2 className='text-xl font-semibold mb-2'>Purchased Products</h2>
                        <p className='text-2xl font-bold'>{userStatasData?.totalPurchadedProducts}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserStatas
