import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BannerSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            id: 1,
            title: "Girl's Fashion",
            discount: "UP TO 20% DISCOUNT ON",
            description:
                "Discover the latest trends and express your unique style with our Women's Fashion website. Explore a curated collection of clothing, accessories, and footwear that caters to every taste and occasion.",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732982275/hero_vj1rz0.png",
        },
        {
            id: 2,
            title: "Men's Fashion",
            discount: "UP TO 15% DISCOUNT ON",
            description:
                "Explore the latest collection of men's clothing, from casual wear to formal outfits, perfect for every occasion.",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732982275/hero_vj1rz0.png",
        },
        {
            id: 3,
            title: "Sportswear",
            discount: "UP TO 10% DISCOUNT ON",
            description:
                "Get ready for action with our range of high-quality sportswear. Comfort and style in one place.",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732982275/hero_vj1rz0.png",
        },
        {
            id: 4,
            title: "Accessories",
            discount: "UP TO 25% DISCOUNT ON",
            description:
                "Complete your look with stylish accessories. From bags to jewelry, we have it all.",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732982275/hero_vj1rz0.pngs",
        },
        {
            id: 5,
            title: "Footwear",
            discount: "UP TO 30% DISCOUNT ON",
            description:
                "Step up your shoe game with our exclusive collection of stylish footwear.",
            img: "https://res.cloudinary.com/dj2edy2rg/image/upload/v1732982275/hero_vj1rz0.pngs",
        },
    ];

    // Function to go to the next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Function to go to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Set up auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-11/12 mx-auto my-6">
            {/* Banner Slider Container */}
            <div className="relative bg-[#fa7b2d] rounded-lg overflow-hidden flex justify-between items-center">
                {/* Text Content */}
                <div className="p-8 z-10 w-full md:w-1/2 text-white">
                    <h4 className="text-lg font-semibold">{slides[currentSlide].discount}</h4>
                    <h1 className="text-4xl font-extrabold mt-2">{slides[currentSlide].title}</h1>
                    <p className="mt-4">{slides[currentSlide].description}</p>
                    <button className="mt-6 px-6 py-3 bg-white text-[#fa7b2d] font-bold rounded-md hover:bg-[#fa7b2d] hover:text-white border border-white transition">
                        <a href="/shop">EXPLORE NOW</a>
                    </button>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <img
                        src={slides[currentSlide].img}
                        alt="header"
                        className="h-[70vh] object-cover float-end rounded-r-lg"
                    />
                </div>

                {/* Slider Navigation */}
                <div className="absolute bottom-0 right-12 transform -translate-y-1/2 p-4 cursor-pointer" onClick={prevSlide}>
                    <span className="text-white text-3xl">
                        <span>
                            <FaChevronLeft />

                        </span>
                    </span>
                </div>
                <div className="absolute bottom-0 right-0 transform -translate-y-1/2 p-4 cursor-pointer" onClick={nextSlide}>
                    <span className="text-white text-3xl">
                        <span>
                            <FaChevronRight />

                        </span>
                    </span>
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-4">
                {slides.map((slide, index) => (
                    <span
                        key={slide.id}
                        className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${currentSlide === index ? "bg-white" : "bg-gray-400"
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
