import React from 'react'

const Trending = () => {
    return (
        <div className="w-full py-16 ">
            <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
                {/* Item 1 */}
                <div className="relative  shadow-lg rounded-lg overflow-hidden group">
                    <img
                        src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733023721/card-2_bw65js.png"
                        alt="Womens Shirt"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 text-black ">
                        <p className="text-sm font-bold text-black ">2023 Trend</p>
                        <h4 className="text-xl font-bold mt-1">Womens Shirt</h4>
                        <a href="#" className="text-sm mt-2 inline-block font-medium text-black hover:text-yellow-500">
                            Discover More +
                        </a>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="relative  shadow-lg rounded-lg overflow-hidden group">
                    <img
                        src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733023721/card-3_xzf6mf.png"
                        alt="Womens Dresses"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 text-black ">
                        <p className="text-sm font-bold">2023 Trend</p>
                        <h4 className="text-xl font-bold mt-1">Womens Dresses</h4>
                        <a href="#" className="text-sm mt-2 inline-block font-medium text-black hover:text-yellow-500">
                            Discover More +
                        </a>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="relative  shadow-lg rounded-lg overflow-hidden group">
                    <img
                        src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733023721/card-1_ioudpl.png"
                        alt="Womens Casuals"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-4 left-4 text-black ">
                        <p className="text-sm font-bold">2023 Trend</p>
                        <h4 className="text-xl font-bold mt-1">Womens Casuals</h4>
                        <a href="#" className="text-sm mt-2 inline-block font-medium text-black hover:text-yellow-500">
                            Discover More +
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Trending
