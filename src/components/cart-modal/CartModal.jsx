import React from 'react'
import OrderSummery from '../order-summery/OrderSummery'
import { useDispatch } from 'react-redux'
import { removeQuentity, updateCartProduct } from '../../redux/feature/cart/cartSlice';

const CartModal = ({ products }) => {
    const dispatch = useDispatch();
    const handleProductUpdate = (type, id) => {
        const payload = { type, id };
        dispatch(updateCartProduct(payload))
    };

    const handleProductRemove = (e, id) => {
        e.preventDefault();
        dispatch(removeQuentity({ id }))

    };

    return (
        <div>
            <h1>cart modal</h1>
            <div className="cart-items">
                {
                    products && products.length == 0 ? (<p>Your cart is empty.</p>) : (products && products.map((product, index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4">
                            <div className='flex items-center'>
                                <span className='mr-4 px-1 bg-primary text-white rounded-full'>0{index + 1}</span>
                                <img src={product?.image} alt="image" className="size-12 object-cover mr-4" />
                                <div>
                                    <h5 className="text-lg font-medium">{product?.name}</h5>
                                    <p className="text-gray-600 text-sm">${product?.price}</p>
                                </div>
                            </div>


                            <div className="flex flex-row md:justify-start justify-end items-center mt-2">
                                <button onClick={() => handleProductUpdate("decrement", product?._id)}
                                    className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8"
                                >
                                    -
                                </button>
                                <span className="px-2 text-center mx-1" >{product?.quantity}</span>
                                <button
                                    onClick={() => handleProductUpdate("increment", product?._id)}

                                    className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700  hover:bg-primary hover:text-white"
                                >
                                    +
                                </button>
                                <div className='ml-5'>
                                    <button
                                        onClick={(e) => handleProductRemove(e, product?._id)}
                                        className="text-red-500 hover:text-red-700 mr-4">Remove</button>
                                </div>
                            </div>


                        </div>
                    )))
                }
                {
                    <div>
                        <OrderSummery></OrderSummery>
                    </div>
                }
            </div>
        </div>
    )
}

export default CartModal
