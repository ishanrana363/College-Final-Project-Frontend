import Banner from './banner/Banner'
import Blog from './blog-page/Blog'
import Category from './category/Category'
import Deal from './deal-section/Deal'
import Feature from './feature-section/Feature'
import TrendingProduct from './trending-product/TrendingProduct'
import Trending from './trending/Trending'

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <Trending></Trending>
            <TrendingProduct></TrendingProduct>
            <Deal></Deal>
            <Feature></Feature>
            <Blog></Blog>
        </div>
    )
}

export default HomePage
