import React from 'react'
import ProductRating from '../product-rating/ProductRating'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product }) => {
    
    
    return (
        <div>
            <div className="w-11/12 mx-auto">


                {/* Product Grid Section */}
                <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {product ? (
                        product.map((item) => (
                            // eslint-disable-next-line react/jsx-key
                            <Link to={`/product-details/${item?._id}`}>
                                <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                    {/* Image Section */}
                                    <div className="relative">
                                        <img
                                            className="w-full h-56 object-cover"
                                            src={item.image} // Dynamically sourced image
                                            alt={item.name}
                                        />
                                        <div className="absolute top-2 right-2">
                                            <button  className="bg-red-500 p-2 rounded-full">
                                                <FaShoppingCart className="text-white w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Product Details Section */}
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-center text-gray-800">{item.name}</h3>
                                        <p className="text-center text-black font-semibold mt-1">${item.price.toFixed(2)} ${item?.oldPrice ? <s>{item?.oldPrice}</s> : null} </p>
                                        <div className="flex justify-center items-center mt-2">
                                            {/* Dynamic Rating Component */}
                                            <ProductRating rating={item?.rating} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center text-xl mt-6">No products found in this category.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
