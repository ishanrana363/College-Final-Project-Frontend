import React from 'react';

const Deal = () => {
    return (
        <div className="w-11/12 mx-auto my-10">
            <div className="bg-[#FA7B2D] h-auto flex flex-col lg:flex-row justify-between items-center py-8 px-3">
                {/* Image Section */}
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <img
                        src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733065815/deals_puczx9.png"
                        alt="deals"
                        className="w-full lg:w-[400px] h-auto mx-auto"
                    />
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-1/2 text-center lg:text-left px-4">
                    <h5 className="lg:text-3xl font-bold text-white">Get Up To 20% Discount</h5>
                    <h4 className="lg:text-2xl font-bold py-2 text-white">Deals Of This Month</h4>
                    <p className="text-white font-semibold text-lg text-justify mb-6">
                        Our Women's Fashion Deals of the Month are here to make your style
                        dreams a reality without breaking the bank. Discover a curated
                        collection of exquisite clothing, accessories, and footwear, all
                        handpicked to elevate your wardrobe.
                    </p>

                    {/* Countdown Section */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-white shadow-2xl w-20 h-20 rounded-full font-bold text-center">
                            <h4 className="mt-3">14</h4>
                            <p>Days</p>
                        </div>
                        <div className="bg-white shadow-2xl w-20 h-20 rounded-full font-bold text-center">
                            <h4 className="mt-3">20</h4>
                            <p>Hours</p>
                        </div>
                        <div className="bg-white shadow-2xl w-20 h-20 rounded-full font-bold text-center">
                            <h4 className="mt-3">15</h4>
                            <p>Mins</p>
                        </div>
                        <div className="bg-white shadow-2xl w-20 h-20 rounded-full font-bold text-center">
                            <h4 className="mt-3">05</h4>
                            <p>Secs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deal;
