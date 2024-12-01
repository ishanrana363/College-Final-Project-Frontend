import Banner from './banner/Banner'
import Category from './category/Category'
import TrendingProduct from './trending-product/TrendingProduct'
import Trending from './trending/Trending'

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Trending></Trending>
            <TrendingProduct></TrendingProduct>
        </div>
    )
}

export default HomePage
