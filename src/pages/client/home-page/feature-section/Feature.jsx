import React from 'react'
import { CiDeliveryTruck } from 'react-icons/ci'
import { FaCreativeCommonsNcEu, FaUserAlt } from 'react-icons/fa'

const Feature = () => {
    return (
        <div className='w-11/12 mx-auto my-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                {/* Free Delivery */}
                <div className='text-center'>
                    <span>
                        <CiDeliveryTruck className='font-bold text-3xl block mx-auto' />
                    </span>
                    <h4 className='lg:text-xl font-bold py-2'>Free Delivery</h4>
                    <p className='font-bold'>
                        Offers convenience and the ability to shop from anywhere, anytime.
                    </p>
                </div>

                {/* 100% Money Back Guarantee */}
                <div className='text-center'>
                    <span>
                        <FaCreativeCommonsNcEu className='font-bold text-3xl block mx-auto' />
                    </span>
                    <h4 className='lg:text-xl font-bold py-2'>100% Money Back Guarantee</h4>
                    <p className='font-bold'>
                        E-commerce have a review system where customers can share feedback.
                    </p>
                </div>

                {/* Strong Support */}
                <div className='text-center'>
                    <span>
                        <FaUserAlt className='font-bold text-3xl block mx-auto' />
                    </span>
                    <h4 className='lg:text-xl font-bold py-2'>Strong Support</h4>
                    <p className='font-bold'>
                        Offer customer support services to assist customers with queries and
                        issues.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Feature;
