import React from 'react';

const Blog = () => {
    return (
        <div className="w-11/12 mx-auto my-10">
            <section>
                <h2 className="text-3xl font-bold text-center mb-4">Latest From Blog</h2>
                <p className="text-lg text-center text-gray-600 mb-8">
                    Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Blog Post 1 */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&amp;w=2070&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Mastering the Art of Capsule Wardrobes"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h6 className="text-sm text-gray-500">Timeless Elegance</h6>
                            <h4 className="text-xl font-semibold mt-2 text-gray-800">Mastering the Art of Capsule Wardrobes</h4>
                            <p className="text-gray-500 mt-2">12th August 2022</p>
                        </div>
                    </div>

                    {/* Blog Post 2 */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1700159017572-de76bb0c5719?q=80&amp;w=2072&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Unveiling the Hottest Beachwear Trends"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h6 className="text-sm text-gray-500">Summer Breeze</h6>
                            <h4 className="text-xl font-semibold mt-2 text-gray-800">Unveiling the Hottest Beachwear Trends</h4>
                            <p className="text-gray-500 mt-2">18th January 2023</p>
                        </div>
                    </div>

                    {/* Blog Post 3 */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1682142715511-27bfbfdc044f?q=80&amp;w=2069&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Navigating the World of Women's Tailoring"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h6 className="text-sm text-gray-500">Power Dressing</h6>
                            <h4 className="text-xl font-semibold mt-2 text-gray-800">Navigating the World of Women's Tailoring</h4>
                            <p className="text-gray-500 mt-2">5th January 2025</p>
                        </div>
                    </div>

                    {/* Blog Post 4 */}
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1713720663924-4e3fe8f20f79?q=80&amp;w=1948&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="The World's Best Fashion Fair 2025"
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4">
                            <h6 className="text-sm text-gray-500">New York Times</h6>
                            <h4 className="text-xl font-semibold mt-2 text-gray-800">The World's Best Fashion Fair 2025</h4>
                            <p className="text-gray-500 mt-2">25th May 2025</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
