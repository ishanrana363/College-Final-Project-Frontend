import React from 'react'
import { useSelector } from 'react-redux'

const OrderSummery = () => {

    const { products, selectedItems, totalPrice } = useSelector((state) => state.cart);
    console.log(products, selectedItems, totalPrice)
    return (
        <div>
            <div className=" bg-primary-light mt-5 rounded text-base">
                <div className="px-6 py-4 space-y-5">
                    <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
                    <p className="text-dark mt-2">Selected Items : {selectedItems} </p>
                    <p className="text-dark mt-2">Total Price : $ {totalPrice.toFixed(2)} </p>
                </div>
                <div className="px-4 pb-6">
                    <button

                        className="bg-red-500 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center mb-4">
                        <span className="mr-2">Clear Cart</span>

                        <i className="ri-delete-bin-7-line"></i>
                    </button>
                    <button

                        className="bg-green-600 px-3 py-1.5 text-white  mt-2 rounded-md flex justify-between items-center">
                        <span className="mr-2">Proceed Checkout</span>
                        <i className="ri-bank-card-line"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummery
