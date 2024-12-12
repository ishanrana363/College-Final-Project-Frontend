import { Link, useParams } from 'react-router-dom';
import { useFetchProductIdQuery } from '../../../redux/feature/product/productApi';
import Spinner from './../../../components/loading-spinner/Spinner';
import ProductRating from '../../../components/product-rating/ProductRating';
import ReviewCard from '../../../components/review/ReviewCard';

const SingleProduct = () => {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const { data: productData, isLoading, isError } = useFetchProductIdQuery(id);

  if (isLoading) return <Spinner />;

  if (isError) return <p className="text-center text-red-500">Failed to load product details.</p>;

  const { data } = productData;
  const { product,reviews } = data;
  console.log(reviews);

  return (
    <div className='w-11/12 mx-auto ' >
      {/* Banner */}
      <section className=" max-w-4xl  mx-auto my-5 h-[50vh] bg-[#FA7B2D] ">
        <div className=" flex flex-col pt-24 items-center mx-auto px-4">
          <div>
            <h2 className="text-3xl font-bold ">Single Product Page</h2>
          </div>
          <div className="flex items-center  mt-2 space-x-2">
            <Link to="/" className="hover:text-primary">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span>{product?.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="  md:w-1/2">
            <img
              src={product?.image}
              alt={product?.name}
              className="rounded-lg shadow-lg w-[90%] h-auto "
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {product?.name}
            </h3>
            <p className="text-xl text-primary font-bold mb-4">
              ${product?.price}{' '}
              {product?.oldPrice && (
                <span className="text-gray-500 line-through text-base">
                  ${product?.oldPrice}
                </span>
              )}
            </p>
            <p className="text-gray-600 mb-6">{product?.description}</p>

            {/* Additional Product Info */}
            <div className="space-y-4">
              <p className="capitalize text-gray-700">
                <strong>Category:</strong> {product?.category}
              </p>
              <p className="capitalize text-gray-700">
                <strong>Color:</strong> {product?.color}
              </p>
              <div className="flex items-center gap-2">
                <strong>Rating:</strong>
                <ProductRating rating={product?.rating} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg shadow-md transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <ReviewCard productReviews = {reviews} ></ReviewCard>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
