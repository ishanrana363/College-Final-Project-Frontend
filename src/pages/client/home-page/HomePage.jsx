import React from 'react'
import Banner from './banner/Banner'
import Category from './Category'
import Trending from '../trending/Trending'

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Trending></Trending>
        </div>
    )
}

export default HomePage
