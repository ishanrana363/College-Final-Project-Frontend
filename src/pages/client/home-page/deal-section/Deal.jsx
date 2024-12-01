import React from 'react'

const Deal = () => {
    return (
        <div className='w-11/12 mx-auto my-10 ' >
            <div className='bg-[#FA7B2D] h-[80vh] flex  justify-between items-center py-8 px-3 '>
                <div className='w-1/2'>
                    <img src="https://res.cloudinary.com/dj2edy2rg/image/upload/v1733065815/deals_puczx9.png" alt="deals" className=' w-[400px] h-auto  ' />
                </div>
                <div className=' w-1/2 '>
                    <h5 className=' lg:text-3xl font-bold  ' >  Get Up To 20% Discount</h5>
                    <h4 className='lg:text-2xl font-bold py-2 ' >Deals Of This Month</h4>
                    <p className='text-black font-semibold text-lg text-justify ' >
                        Our Women's Fashion Deals of the Month are here to make your style
                        dreams a reality without breaking the bank. Discover a curated
                        collection of exquisite clothing, accessories, and footwear, all
                        handpicked to elevate your wardrobe.
                    </p>
                    <div className='flex items-center gap-4 py-5 '>
                        <div className=' bg-white shadow-2xl   w-20 h-20 rounded-full font-bold text-center   '>
                            <h4 className='mt-3' >14</h4>
                            <p>Days</p>
                        </div>
                        <div className='bg-white  w-20 h-20 shadow-2xl rounded-full font-bold text-center   '>
                            <h4 className='mt-3'  >20</h4>
                            <p>Hours</p>
                        </div>
                        <div className='bg-white  w-20 h-20 shadow-2xl rounded-full font-bold text-center   '>
                            <h4 className='mt-3' >15</h4>
                            <p>Mins</p>
                        </div>
                        <div className='bg-white  w-20 h-20 shadow-2xl rounded-full font-bold text-center   '>
                            <h4 className='mt-3'  >05</h4>
                            <p>Secs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deal
