import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/feature/cart/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { baseUrl } from './../../util/baseUrl';



const OrderSummery = () => {
    const dispatch = useDispatch();
    const { products, selectedItems, totalPrice } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const removeCart = () => {
        dispatch(clearCart());
    };


    const makePayment = async (e) => {

        const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

        console.log(stripe)

        const body = {
            userId: user._id,
            products: products,
        }
        console.log(body);

        try {
            const response = await axios.post(`${baseUrl()}/create-checkout-session`, body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const result = stripe.redirectToCheckout({
                sessionId: response.data.id
            })

            console.log(response)

        } catch (error) {
            console.error("checkout error", error);
        }

    };

    return (
        <div>
            <div className="bg-primary-light mt-5 rounded text-base">
                <div className="px-6 py-4 space-y-5">
                    <h1 className="text-2xl font-bold text-dark">Order Summary</h1>
                    <p className="text-dark mt-2">Selected Items: {selectedItems}</p>
                    <p className="text-dark mt-2">Total Price: $ {totalPrice.toFixed(2)}</p>
                </div>
                <div className="px-4 pb-6">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            removeCart();
                        }}
                        aria-label="Clear the cart"
                        className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
                    >
                        <span className="mr-2">Clear Cart</span>
                        <i className="ri-delete-bin-7-line"></i>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            makePayment();
                        }}
                        aria-label="Proceed to checkout"
                        className="bg-green-600 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center"
                    >
                        <span className="mr-2">Proceed Checkout</span>
                        <i className="ri-bank-card-line"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSummery;
